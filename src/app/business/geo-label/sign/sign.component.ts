import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import mapboxgl from 'cityfun-gl';
import {
  event_mousemove_key,
  offMapEvent,
  event_click_key,
  MarkerStatue,
} from '../utils/mapTool';
import { DOCUMENT } from '@angular/common';
import {ListLabelItem, SearchParams} from "../types";
import {SignService} from "./sign.service";
import {listWktToGeoJson} from "../utils/main-format";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(
    private mapboxMapService: MapboxmapService,
    @Inject(DOCUMENT) private doc: Document,
    private  signService:SignService

  ) {}
  mapboxMap: mapboxgl.Map = null;
  markerStatue: MarkerStatue = MarkerStatue.none; // 状态
  moveMarker: mapboxgl.Marker = null;
  editMarker: mapboxgl.Marker = null;
  showEditTool:boolean = false;
  tagList = [];
  eventCallBack = {
    // key: function () {},
  };

  ngOnInit() {

    this.mapboxMapService.init().subscribe((mapboxMap: any) => {
      this.mapboxMap = mapboxMap;
      if (
        mapboxMap.isStyleLoaded() ||
        this.mapboxMapService.firstFullLoaded
      ) {
        this.mapInit();
      }
      mapboxMap.on('load', () => {
        this.mapInit();
      });
    });
  }
  mapInit():void {
    this.bindMapEvent();
    this.getTags();
  }
  bindMapEvent():void {}
  /**
   * 添加标记
   */
  addMarker(): void {
    let self = this;
    this.markerStatue = MarkerStatue.moveing;
    this.mapboxMapService.setCursor('default');
    offMapEvent(
      this.mapboxMap,
      'mousemove',
      event_mousemove_key,
      this.eventCallBack
    );
    this.eventCallBack[event_mousemove_key] = function (e) {
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], true);
    };
    this.mapboxMap.on('mousemove', this.eventCallBack[event_mousemove_key]);
    offMapEvent(this.mapboxMap, 'click', event_click_key, this.eventCallBack);
    this.eventCallBack[event_click_key] = function (e) {
      self.markerStatue = MarkerStatue.editing;
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], false);
      self.mapboxMapService.setCursor('grab');
      offMapEvent(
        self.mapboxMap,
        'mousemove',
        event_mousemove_key,
        self.eventCallBack
      );
    };
    this.mapboxMap.once('click', this.eventCallBack[event_click_key]);
  }
  /**
   * 停止标记
   */
  stopMarker(): void {
    offMapEvent(
      this.mapboxMap,
      'mousemove',
      event_mousemove_key,
      this.eventCallBack
    );
    //  offMapEvent(this.mapboxMap, 'click', event_click_key, this.eventCallBack);
    this.markerStatue = MarkerStatue.none;
    if (this.moveMarker) {
      this.moveMarker.remove();
      this.moveMarker = null;
    }
    if (this.editMarker) {
      this.editMarker.remove();
      this.editMarker = null;
    }
    this.mapboxMapService.setCursor('default');
    this.showEditTool = false;
  }
  // 添加 Move Marker
  addMoveMarker(coordinate: [number, number], isMoveing?: boolean): void {
    let el = this.doc.createElement('div');
    el.className = 'add-marker marker';
    el.style.backgroundImage = 'url(./assets/img/map/cursor_mark.png)';
    el.style.width = '24px';
    el.style.height = '36px';
    if (isMoveing) {
      if (this.moveMarker) {
        this.moveMarker.setLngLat(coordinate);
      } else {
        this.moveMarker = new mapboxgl.Marker({
          element: el,
          offset: [0, -20],
        })
          .setLngLat(coordinate)
          .addTo(this.mapboxMap);
      }
    } else {
      if (this.editMarker) {
        this.editMarker.setLngLat(coordinate);
      } else {
        this.editMarker = new mapboxgl.Marker({
          element: el,
          offset: [0, -20],
        })
          .setLngLat(coordinate)
          .addTo(this.mapboxMap);
      }
    }
  }
  toggleEditTool(isShow:boolean):void{
    this.showEditTool = isShow;
  }
  doSearch(searchParams:SearchParams){
    console.log("调用查询接口",searchParams)
    this.getTags();
  }
  getTags():void{
     this.signService.getTag().subscribe(res=>{
         this.tagList = res;
         let geoSource = listWktToGeoJson(res,'wkt');

       this.drawTags(geoSource);

     });
  }
  drawTags(geoSource):void{
    this.mapboxMapService.removeLayerByIds(['tag-layer']);
    this.mapboxMap.loadImage('./assets/img/map/icon_map_switch_mine.png',(error,image)=>{
      this.mapboxMap.addImage('tag-layer',image);
      this.mapboxMap.addLayer({
        'id': 'tag-layer',
        'type': 'symbol',
        'source':  {
          'type':'geojson',
          'data':geoSource
        },
        'layout': {
          'icon-image': 'tag-layer',
          'icon-size':1,
          'text-field': ['get','index'],
          'text-font': ['MicrosoftYaHeiRegular'],
          'text-offset': [0, -.2],
          "icon-allow-overlap":true
        },
        'paint': {
          'text-color': '#fff'
        },
      })
    })
  }
  hideTagFeatures(ids:Array<string>):void{

    if(ids.length<=0){
      return;
    }
    this.mapboxMap.setFilter('tag-layer', ['match', ['get', 'id'], ids.map((item)=> {
      return item
    }), false, true]);
  }
}
