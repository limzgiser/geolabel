import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { ClassifyService } from '../classify.service';
import { MapboxmapService } from '../../../../cityfun/mapbox-map/service/mapboxmap.service';
import { listWktToGeoJson } from '../../utils/main-format';
import { groupBy } from 'lodash';
import { Evented } from 'mapbox-gl';

interface nodeType {
  type: 'add' | 'remove';
  key: string;
}

@Component({
  selector: 'lb-classify-tree',
  templateUrl: './classify.tree.component.html',
  styleUrls: ['./classify.tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassifyTreeComponent implements OnInit, OnDestroy {
  xhrx = {};
  constructor(
    private cdr: ChangeDetectorRef,
    private classifyService: ClassifyService,
    private mapboxmapService: MapboxmapService,
    private nzMessageService: NzMessageService
  ) {}
  keys = new Set();
  searchValue = '';
  @Input()
  nodes = [];
  @Output() refreshTree = new EventEmitter<string>();
  @Input() treeid = '';
  loadInitLayers(e) {
    // console.log(e);
  }
  selectLayers(e: []) {
    // @ts-ignore
    this.getNodeListData(e[0]);
  }
  removeKeys(e: []) {
    // @ts-ignore
    e[1].forEach((key) => {
      this.keys.delete(key);
    });
    // @ts-ignore
    this.mapboxmapService.removeLayerByIds(e[1]);
  }
  treeDestroy(e) {
    // console.log(e);
  }

  getNodeListData(nodeId: string): void {
    let map = this.mapboxmapService.getMap();
    this.xhrx['getClassifyNodeDataList'] = this.classifyService
      .getClassifyNodeDataList({
        nodeId: nodeId,
      })
      .subscribe((result) => {
        let group = this.groupList(result);
        let keys = Object.keys(group);

        keys.forEach((key) => {
          this.keys.add(key);
          let list = group[key];
          let geojson = listWktToGeoJson(list, 'geom');
          let source = {
            type: 'geojson',
            data: geojson,
          };
          if (map.getLayer(key)) {
            this.mapboxmapService.removeLayerByIds([key]);
          }
          map.addLayer({
            id: key,
            type: 'circle',
            source: source,
            layout: {},
            paint: {
              'circle-radius': 5,
              'circle-color': 'red',
              'circle-opacity': 0.75,
              'circle-stroke-color': '#000',
              'circle-stroke-width': 1,
            },
          });
        });
        // let geojson =   listWktToGeoJson(result,'geom');
      });
  }
  editNodeEvent(e) {
    let { key, value } = e;
    let prams = {
      nodeId: key,
      nodeName: value,
    };
    this.classifyService.editClassifyNode(prams).subscribe((result) => {
      let nodeId = result;
      if (nodeId) {
        this.nzMessageService.success('编辑成功！');
        this.refreshTree.emit(nodeId);
      } else {
        this.nzMessageService.error('编辑失败！');
      }
    });
  }
  deleteNodeEvent(e) {
    console.log(e);
    let nodeId = e;
    let treeId = this.treeid;
    let prams = {treeId,nodeId};
    this.classifyService.deleteClassifyNode(prams).subscribe(result=>{
      if (result) {
        this.nzMessageService.success('删除成功!');
        this.refreshTree.emit(this.treeid);
      } else {
        this.nzMessageService.error('删除成功!');
      }
    })
  }

  addNodeEvent(e) {
    console.log(this.treeid);

    e.treeId = this.treeid;
    this.classifyService.addClassifyNode(e).subscribe((result) => {
      if (result) {
        this.nzMessageService.success('添加成功！');
        this.refreshTree.emit(result);
      } else {
        this.nzMessageService.error('添加失败！');
      }
    });
  }
  groupList(list) {
    return groupBy(list, (item) => item.nodeid);
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log();
    // @ts-ignore
    const ids: Array<string> = Array.from(this.keys);
    this.mapboxmapService.removeLayerByIds(ids);
    Object.keys(this.xhrx).forEach((key) => {
      this.xhrx[key].unsubscribe();
    });
  }
}
