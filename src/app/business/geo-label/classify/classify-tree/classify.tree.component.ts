import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzFormatEmitEvent} from "ng-zorro-antd";
import {ClassifyService} from "../classify.service";
import {MapboxmapService} from "../../../../cityfun/mapbox-map/service/mapboxmap.service";
import {listWktToGeoJson} from "../../utils/main-format";
import {groupBy} from "lodash";

interface nodeType {
  type:'add'|'remove';
  key:string;
}

@Component({
  selector: 'lb-classify-tree',
  templateUrl: './classify.tree.component.html',
  styleUrls: ['./classify.tree.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ClassifyTreeComponent implements OnInit,OnDestroy {
  xhrx = {};
  constructor(private cdr:ChangeDetectorRef,
              private  classifyService:ClassifyService,
              private mapboxmapService:MapboxmapService) {

  }
  keys  = new Set();
  searchValue = '';
  @Input()
  nodes = [ ];

  loadInitLayers(e){
    // console.log(e);
  }
  selectLayers(e:[]){


     // @ts-ignore
    this.getNodeListData(e[0]);
  }
  removeKeys(e:[]){
   // @ts-ignore
    this.mapboxmapService.removeLayerByIds(e[1])
  }
  treeDestroy(e){
    // console.log(e);
  }

  getNodeListData(nodeId:string):void{
    let map = this.mapboxmapService.getMap();
    this.xhrx ['getClassifyNodeDataList'] = this.classifyService.getClassifyNodeDataList({
      nodeId:nodeId
    }).subscribe(result=>{
      let group = this.groupList(result);
      Object.keys(group).forEach(key=>{
        let list = group[key];
        let geojson =  listWktToGeoJson(list,'geom');
                let source = {
                  type:"geojson",
                  data:geojson,
                };
                if(map.getLayer(key)){
                   this.mapboxmapService.removeLayerByIds([key])
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
                    'circle-stroke-color':'#000',
                    "circle-stroke-width":1,
                  }
              })
      })
      // let geojson =   listWktToGeoJson(result,'geom');

  })
  }
  editNodeEvent(e){
      console.log(e)
  }
  groupList(list){
     return   groupBy(list,item=>item.nodeid)
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log(Array.from(this.keys));
    Object.keys( this.xhrx).forEach(key=>{
      this.xhrx[key].unsubscribe();
    })

  }
}
