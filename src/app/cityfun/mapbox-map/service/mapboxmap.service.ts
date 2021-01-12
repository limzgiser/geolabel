import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { Observable, of } from 'rxjs';
import { mapTo, delay, take, switchMap } from 'rxjs/operators';
import { cursorType } from './mapboxTypes';
import {CfhttpService} from "../../../services/cfhttp.service";
// mapboxgl.srid = 4326;   // 4326 or 3857

@Injectable({
  providedIn: 'root',
})
export class MapboxmapService {
  styleinit = false;

  specialStyel = null;

  mapboxmap = null;
  firstFullLoaded = false;
  constructor(
    private http: HttpClient,
    private cfHttp: CfhttpService
  ) {
    this.init().subscribe((res) => {
      console.log('地图创建完成');
      this.mapboxmap.on('load', () => {
        console.log('样式加载完成');
        this.addSplieGroupLayer();
      });
    });
  }
  /**
   * 底图初始化、单例创建地图、加载专题图配置文件
   */
  init() {
    if (this.mapboxmap || this.specialStyel) {
      return of(this.mapboxmap);
    } else {
      return this.getBaseMapStyle().pipe(
        switchMap((style_base) => {
          return this.createSpMap(style_base);
        })
      );
    }
  }
  /**
   * 默认添加三个图层组合，用来控制添加专题图层顺序
   */
  private addSplieGroupLayer() {
    this.mapboxmap.addLayer({
      id: 'sp-layer-fill',
      type: 'fill',
      source: {
        type: 'geojson',
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: 'sp-layer-line',
      type: 'line',
      source: {
        type: 'geojson',
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: 'sp-layer-point',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: 'sp-layer-hot',
      type: 'heatmap',
      source: {
        type: 'geojson',
        data: null,
      },
    });
  }

  /**
   *
   * 获取图层beforeid
   * @param type  图层类型
   */
  public getBeforeLayerIdByLayerType(type) {
    if (type === 'symbol' || type === 'circle') {
      return '';
    }
    if (type === 'line') {
      return 'sp-layer-line';
    } else if (type === 'heatmap') {
      return 'sp-layer-hot';
    } else {
      return 'sp-layer-fill';
    }
  }
  /**
   * 获取底图样式配置文件
   */
  private getBaseMapStyle() {
    return this.cfHttp.get('base.map').pipe(take(1)); //.toPromise();
  }

  /**
   *
   * @param style  创建地图
   */
  private createSpMap(style): Observable<mapboxgl.Map> {
    let self = this;
    if (this.mapboxmap) {
      return of(this.mapboxmap);
    } else {
      let tmpstyle = {
        container: 'mapboxmap',
        style: style,
      };
      self.mapboxmap = new mapboxgl.Map(tmpstyle);
      self.mapboxmap.on('load', () => {
        this.firstFullLoaded = true;
      });
      return of(self.mapboxmap);
    }
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
  /**
   * 图层 id 数组
   * @param layerids
   */
  public removeLayerByIds(layerids: Array<string>, rimg = true) {
    if (this.mapboxmap) {
      for (let id of layerids) {
        // console.log(999, layerids);
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
  /**
   *
   * @param style  geojson  数据源 图层样式
   * @param options  beforeIds
   */
  public addGeoJSONLayer(style: any, options: any) {
    this.removeLayerByIds([style.id]);
    if (options.beforeId) {
      this.mapboxmap.addLayer(style, options.beforeId);
    } else {
      const defaultBeforeid = this.getBeforeLayerIdByLayerType(style.type);
      // sp-layer-point
      if (defaultBeforeid) {
        this.mapboxmap.addLayer(style, defaultBeforeid);
      } else {
        this.mapboxmap.addLayer(style);
      }
    }
  }
  /**
   * 添加地图气泡，marker
   * @param options
   * @param coordinates
   */
  public addMarker(options, coordinates) {
    return new mapboxgl.Marker(options)
      .setLngLat(coordinates)
      .addTo(this.mapboxmap);
  }
  /**
   *
   * @param style  图层样式
   * @param options  { beforeId }
   */
  public addSymbolLayer(style: any, options: any) {
    const imgurl = options.img;
    const imgid = style.id;
    const ispath = imgurl.match(/\.(jpeg|jpg|gif|png)$/); // 图片地址路径
    if (this.mapboxmap.hasImage(imgid)) {
      this.removeLayerByIds([imgid]);
    }
    if (ispath) {
      this.mapboxmap.loadImage(imgurl, (error, image) => {
        if (!image) {
          console.log('加载图片资源出错', imgurl);
          return;
        }
        if (this.mapboxmap.hasImage(imgid)) {
          this.mapboxmap.removeImage(imgid);
        }
        this.mapboxmap.addImage(imgid, image);
        if (options.beforeId) {
          this.mapboxmap.addLayer(style, options.beforeId);
        } else {
          this.mapboxmap.addLayer(style);
        }
      });
    } else {
      if (options.beforeId) {
        this.mapboxmap.addLayer(style, options.beforeId);
      } else {
        this.mapboxmap.addLayer(style);
      }
    }
  }

  // 移除地图
  removeBaseLayer() {
    const baseStyleJson = this.mapboxmap.getStyle();
    const removeLayers = [];
    for (let item of baseStyleJson.layers) {
      if (item.id === 'sp-layer-fill') {
        break;
      }
      removeLayers.push(item);
    }
    // console.log(removeLayers)
    const removeSource = new Set();
    for (const layer of removeLayers) {
      // "sp-layer-hot";"sp-layer-fill";"sp-layer-line"; "sp-layer-point";'

      // if (/^(sp-layer-)/.test(layer.id)) {
      //   continue;
      // }
      if (this.mapboxmap.getLayer(layer.id)) {
        this.mapboxmap.removeLayer(layer.id);
        removeSource.add(layer.source);
      }
    }
    Array.from(removeSource).forEach((key) => {
      if (this.mapboxmap.getSource(key)) {
        this.mapboxmap.removeSource(key);
      }
    });
  }
  createCavans(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  // 添加精灵图资源
  addImages(spritePath) {
    const self = this;
    this.http
      .get(`${spritePath}.json`)
      .toPromise()
      .then((spriteJson) => {
        const img = new Image();
        img.onload = function () {
          Object.keys(spriteJson).forEach((key) => {
            const spriteItem = spriteJson[key];
            const { x, y, width, height } = spriteItem;
            const canvas = self.createCavans(width, height);
            const context = canvas.getContext('2d');
            context.drawImage(img, x, y, width, height, 0, 0, width, height);
            // 单位雪碧图项，转base64字符串
            const base64Url = canvas.toDataURL('image/png');
            self.mapboxmap.loadImage(base64Url, (error, simg) => {
              if (!self.mapboxmap.hasImage(key)) {
                self.mapboxmap.addImage(key, simg);
              }
            });
          });
        };
        img.crossOrigin = 'anonymous';
        img.src = `${spritePath}.png`;
      });
  }
  // 添加一整张底图
  addMapStyle(styleUrl, option?) {
    const self = this;
    return (
      this.http
        .get(styleUrl)
        // .pipe(delay(1000))
        .subscribe((styleJson: any) => {
          Object.keys(styleJson.sources).forEach((key) => {
            if (!this.mapboxmap.getSource(key)) {
              self.mapboxmap.addSource(key, styleJson.sources[key]);
            }
          });
          if (styleJson.sprite) {
            this.addImages(styleJson.sprite);
          }
          for (const layer of styleJson.layers) {
            let layerid = layer.id;
            if (option && option.idbeg) {
              layerid = option.idbeg + layerid;
              layer.id = layerid;
            }
            if (!self.mapboxmap.getLayer(layerid)) {
              if (option && option.baseMap) {
                self.mapboxmap.addLayer(layer, 'sp-layer-fill');
              } else {
                self.mapboxmap.addLayer(layer);
              }
            }
          }
          if (option && option.zoom) {
            const { center, pitch, bearing, zoom } = styleJson;
            this.mapboxmap.flyTo({
              center: center,
              zoom: zoom,
              pitch: pitch,
              bearing: bearing,
              speed: 0.5,
            });
          }
        })
    );
  }
  // 根据图层id，移除图层，以id 开头
  removeLayerByBegId(begid) {
    const baseStyleJson = this.mapboxmap.getStyle();
    for (let item of baseStyleJson.layers) {
      if (item.id.startsWith(begid)) {
        this.removeLayerByIds([item.id]);
      }
    }
  }
}
