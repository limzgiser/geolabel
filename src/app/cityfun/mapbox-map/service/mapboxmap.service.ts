import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import cityfun from 'cityfun-gl';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { cursorType } from './mapboxTypes';
import {CfhttpService} from "../../../services/cfhttp.service";
const cfToken = encodeURIComponent( 'yAkqtubPdGtD61/l8DNLXhQrBCUcCeCQR9dzlyiMXHp3Qe9zsEtfy9k0YMAmXwOzx9p6BulJNYrLbejxUp6zYWpHhnKqZcgr3FjHGv8ybhHqLd4eWoGztA==');

@Injectable({
  providedIn: 'root',
})
export class MapboxmapService {
  specialStyel = null;
  mapboxmap = null;

  firstFullLoaded = false;
  constructor(
    private http: HttpClient,
    private cfHttp: CfhttpService
  ) {
    this.init().subscribe((res) => {
      console.log('地图创建完成');
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
          return this.createMap(style_base);
        })
      );
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
  private createMap(style): Observable<cityfun.Map> {
    let self = this;
    if (this.mapboxmap) {
      return of(this.mapboxmap);
    } else {
      cityfun.setConfig({
        cfToken:cfToken
           
      });
      self.mapboxmap = new  cityfun.Map({
        container: "mapboxmap",
        center: [120.70044254024515, 31.301339366724918],
        zoom: 14,
        pitch: 60,
        style: "http://192.168.2.76/geocms/v1/cf/rest/services/MapService/VT/c772577d-6200-4469-8147-35d8009ab728",
      });
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
