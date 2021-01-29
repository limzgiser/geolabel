import { HttpClient } from '@angular/common/http';

import { MapboxmapService } from './../mapbox-map/service/mapboxmap.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {CfhttpService} from "../../services/cfhttp.service";
@Component({
  selector: 'app-mapbox-maptree-control',
  templateUrl: './mapbox-maptree-control.component.html',
  styleUrls: ['./mapbox-maptree-control.component.scss']
})
export class MapboxMaptreeControlComponent implements OnInit {
  mapboxglmap = null;
  constructor(private mapboxmapService: MapboxmapService,
    private cfHttp:CfhttpService,
    private http: HttpClient) { }
  defaultKeys: Array<string> = [];
  isLoadedDefaultLayers = false;
  nodes = null;
  private styleConfig = null;
  private symbolLayerIcons = null;
  private nodeKeyLayerids = null; // 图层树节点查询图层列表
  @Output() showLegend = new EventEmitter<any>();
  private legends = [];
  private mapboxmapConfig = null;
  xhrs = {
    // "38467CF0-2CD8-4E90-873E-6482D3DDB948":obje
  };
  ngOnInit() {

    this.getConfig().then((results: any) => {
      this.nodes = results[0].data;
      this.mapboxmapConfig = results[1];
      this.nodeKeyLayerids = results[2];

    });

    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (mapboxglmap.isStyleLoaded()) {
        this.mapInit();
      }
      mapboxglmap.on('load', () => {
        // 加载默认勾选图层
        this.mapInit();
      });
    });

  }
  mapInit() {
    this.loadDeafultStyle();

  }

  // cf-tree默认事件
  loadInitLayers(keys) {
    // 加载默认勾选图层
    this.defaultKeys = keys;
    this.loadDeafultStyle();

  }
  loadDeafultStyle() {
    if (this.defaultKeys.length > 0 && !this.isLoadedDefaultLayers) {
      this.showLegends(this.defaultKeys);
      this.isLoadedDefaultLayers = true;
      // 加载默认图层
      let layers = this.mapboxmapService.getMapLayersInfoByAids(this.defaultKeys);
      this.mapboxmapService. addLayers(layers);
    }
  }
  loadStyle(layer) {
    const layerObser =  this.http.get(layer.url).subscribe(styleObj=>{
      this.mapboxglmap.addMapStyle(styleObj,{
        styleid: layer.id
      })
    })
    this.xhrs[layer.id] = layerObser;
  }

  selectLayers(nodekeys) {
    this.showLegends(nodekeys, 'add');
    const layers = this.mapboxmapService.getMapLayersInfoByAids(nodekeys);
    this.mapboxmapService.addLayers(layers);
  }
  removeKeys(keys) {
    const layers = this.mapboxmapService.getMapLayersInfoByAids(keys);
    this.mapboxmapService.removeLayers(layers,this.mapboxmapService);
    // layers.forEach(layer => {
    //   if (this.xhrs[layer.id]) {
    //     this.xhrs[layer.id].unsubscribe();
    //     delete this.xhrs[layer.id];
    //   }
    //   this.mapboxglmap.removeMapStyle(layer.id);
    // });
  }

  // 获取配置文件
  getConfig() {
    return Promise.all([
      this.getTreeConfig(),
      this.getMapboxMapConfig(),
      this.getTreeKeyLyrIdConfig()
    ]);
  }
  // 显示图例
  showLegends(keys, rtype: 'remove' | 'add' = 'add') {

    const legneds = this.getLayerInfoByNodeKey(keys, 'legend');
    if (rtype === 'add') {
      this.legends.push(...legneds);
    } else {
      this.legends = this.legends.filter(i => {
        return !(legneds.indexOf(i) > -1);
      });
    }
    this.showLegend.emit(this.legends);

  }
  // 获取树节点对应的图层Ids
  private getLayerInfoByNodeKey(nodeKeys, type= 'legend'  ) {
    const ids = [];
    const legends = [];
    if (this.nodeKeyLayerids) {
      nodeKeys.forEach(nodekey => {
        const fitem = this.nodeKeyLayerids.find(item => nodekey === item.nodeid);
        if(fitem){

          const legend = fitem.legned;

          legends.push(...legend);
        }
      });
      if (type === 'legend') {
        return legends;
      } else {
        return ids;
      }

    } else {
      console.log('图层树节点-图层ID配置文件未加载！！');
    }
  }

  // 图层书配置文件
  private getTreeConfig() {
    return this.cfHttp.get('tree.config', ).toPromise();
  }
  private getMapboxMapConfig() {
    return this.cfHttp.get('mapbox.map').toPromise();
  }

  private getTreeKeyLyrIdConfig() {
    return this.cfHttp.get('tree.legend', ).toPromise();
  }

  treeDestroy(data) {

    this.removeKeys(data);
    //  this.mapboxmapService.removeLayerByIds();
  }


}
