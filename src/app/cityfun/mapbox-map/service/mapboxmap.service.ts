import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import cityfun from 'cityfun-gl';
import { from, Observable, of } from 'rxjs';

import { cursorType } from './mapboxTypes';
import { CfhttpService } from '../../../services/cfhttp.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MapboxmapService {
  specialStyel = null;
  mapboxmap = null;
  mapConfig = null;
  firstFullLoaded = false;
  xhrs = {};
  constructor(
    private http: HttpClient,
    private cfHttp: CfhttpService,
    private route: ActivatedRoute
  ) {
    this.mapConfig = JSON.parse(sessionStorage.getItem('map.config'));
    // this.init().subscribe((res) => {
    //   console.log('地图创建完成');
    // });
  }
  /**
   * 底图初始化、单例创建地图、加载专题图配置文件
   */
  init() {
    if (this.mapboxmap || this.specialStyel) {
      return of(this.mapboxmap);
    } else {
      return this.createMap();
    }
  }
  /**
   *
   * @param style  创建地图
   */
  private createMap(): Observable<cityfun.Map> {
    let basMapAid = this.mapConfig.defaultlayers[0].aid;
    let baseMapInfo = this.getMapLayersInfoByAids([basMapAid]);
    let { url } = baseMapInfo[0].layer;
    let { center, zoom, pitch } = this.mapConfig.mapinfo;
    let self = this;
    if (this.mapboxmap) {
      return of(this.mapboxmap);
    } else {
      cityfun.setConfig({
        cfToken: self.mapConfig.mapToken,
        EPSG:3857,
        geosite:"@cf"
      });
      self.mapboxmap = new cityfun.Map({
        container: 'mapboxmap',
        center: center,
        zoom: zoom,
        pitch: pitch,
        style: url,
      });
      self.mapboxmap.on('load', () => {
        this.firstFullLoaded = true;
      });
      return of(self.mapboxmap);
    }
  }
  // 通过 aid获取地图服务信息
  public getMapLayersInfoByAids(aids) {
    if (!this.mapConfig) {
      return;
    }
    const config = this.mapConfig;
    const layersInfo = [];
    aids.forEach((aid) => {
      const alayer = config.alayers.find((item) => item.aid === aid);
      config.layers.forEach((layer) => {
        let alayerItem = alayer.layers.find((i) => i.id === layer.id);
        if (alayerItem) {
          layersInfo.push({
            layer,
            aid: alayer.aid,
            meta: alayerItem,
          });
        }
      });
    });
    return layersInfo;
  }
  addLayers(layers) {
    let map = this.mapboxmap;
    layers.forEach((layerInfo) => {
      switch (layerInfo.layer.type) {
        // PT-VTStyle,PT-WMS,PT-WMTS,PT-ESRI-Tile,PT-ESRI-Dynamic
        case 'PT-WMS':
          map.addWMSLayer(layerInfo.layer.url, {
            layerid: layerInfo.aid,
            layers: layerInfo.meta.layers,
          });
          break;
        case 'PT-ESRI-Dynamic':
          map.addArcGISDynamicLayer(layerInfo.layer.url, {
            layerid: layerInfo.aid,
            layers: layerInfo.meta.layers,
          });
          break;
        case 'PT-ESRI-Tile':
          map.addArcGISTileLayer(layerInfo.layer.url, {
            layerid: layerInfo.aid,
          });
          break;
        case 'PT-WMTS':
          map.addWMTSLayer(layerInfo.layer.url, {
            layerid: layerInfo.aid,
            layers: layerInfo.meta.layers,
          });
          break;
        case 'PT-VTStyle':
          this.xhrs[layerInfo.aid] = from(
            map.loadMapStyle(layerInfo.layer.url)
          ).subscribe((styleObj) => {
            map.addMapStyle(styleObj, {
              styleid: layerInfo.aid,
              isFlyTo: false, // 默认false
            });
          });
          break;
        default:
          break;
      }
    });
  }
  removeLayers(layers, mapboxservice) {
    let map = this.mapboxmap;
    layers.forEach((layerInfo) => {
      switch (layerInfo.layer.type) {
        // PT-VTStyle,PT-WMS,PT-WMTS,PT-ESRI-Tile,PT-ESRI-Dynamic
        case 'PT-WMS':
        case 'PT-ESRI-Dynamic':
        case 'PT-ESRI-Tile':
        case 'PT-WMTS':
          this.removeLayerByIds([layerInfo.aid]);
          break;
        case 'PT-VTStyle':
          this.xhrs[layerInfo.aid] && this.xhrs[layerInfo.aid].unsubscribe();
          map.removeMapStyle(layerInfo.aid);
          break;
        default:
          break;
      }
    });
  }
  /**
   * 获取地图
   */
  public getMap() {
    return this.mapboxmap;
  }

  public setCursor(type: cursorType) {
    const canvas = this.mapboxmap.getCanvas();
    canvas.style.cursor = type || '';
  }

  /**
   * 定位到目标
   */
  public setFlyTo(options) {
    this.mapboxmap.flyTo(options);
  }

  /**
   * 设置Pitch
   * @param num
   * @param options
   */
  public setPitch(num, options?) {
    this.mapboxmap.setPitch(num, options);
  }
  /**
   * 移除marker
   */
  public removeMarker(marker) {
    marker.remove();
  }
  /**
   * 设置bear
   */
  public setBearing(num) {
    this.mapboxmap.setBearing(num);
  }

  public removeLayerByIds(layerids: Array<string>, rimg = true) {
    if (this.mapboxmap) {
      for (let id of layerids) {
        if (this.mapboxmap.getLayer(id)) {
          this.mapboxmap.removeLayer(id);
        }
        if (this.mapboxmap.getSource(id)) {
          this.mapboxmap.removeSource(id);
        }
        if (this.mapboxmap.hasImage(id) && rimg) {
          this.mapboxmap.removeImage(id);
        }
      }
    }
  }
}
