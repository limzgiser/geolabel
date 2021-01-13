import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import mapboxgl from 'cityfun-gl';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { cursorType } from './mapboxTypes';
import {CfhttpService} from "../../../services/cfhttp.service";

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
  private createMap(style): Observable<mapboxgl.Map> {
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
