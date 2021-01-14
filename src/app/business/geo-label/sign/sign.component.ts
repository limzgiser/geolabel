import {Component, OnInit, Inject, ViewChild, Input} from '@angular/core';
import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import mapboxgl from 'cityfun-gl';
import {
  event_mousemove_key,
  offMapEvent,
  event_click_key,
  MarkerStatue,
} from '../utils/mapTool';
import { DOCUMENT } from '@angular/common';
import {SearchParams, searchTagResult, tagDetailInfo, tagListItem} from "../types";
import {SignService} from "./sign.service";
import {EditToolService} from "./services/edit-tool.service";
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
    private  signService:SignService,
    private  editToolService:EditToolService

  ) {}
  toggleEditTool$ = null;
  mapboxMap: mapboxgl.Map = null;
  markerStatue: MarkerStatue = MarkerStatue.none; // 状态
  moveMarker: mapboxgl.Marker = null;
  editMarker: mapboxgl.Marker = null;
  showEditTool:boolean = false;
  showTagDetail:boolean = false;
  tagDetailInfo :tagDetailInfo = null;
  defaultSearchParams:SearchParams = {
    keyWord:'',
    categoryId: '',
    startTime:   '',
    endTime: '',
    pageSize: 10,
    pageNo: 1
  }
  tagList:searchTagResult =  null;
  totalCount:number = 0 ;
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
    this.toggleEditTool$ = this.editToolService.toggleTool$.subscribe(
      (isShow: boolean) => {
        this.showEditTool = isShow;
      }
    );
  }
  mapInit():void {
    this.bindMapEvent();
    this.getTags(null);
    // this.getAllTagListPoint();
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
    offMapEvent(  this.mapboxMap,  'mousemove',   event_mousemove_key,  this.eventCallBack );
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

  /**
   * 執行查詢標記
   * @param searchParams
   */
  doSearch(searchParams:SearchParams){
    this.getTags(searchParams);
  }
  closeDetail():void{
    this.tagDetailInfo = null;
    this.getTags(null);
  }

  drawTags(geoSource,iconUrl,layerid):void{
    this.mapboxMapService.removeLayerByIds([layerid]);
    this.mapboxMap.loadImage(iconUrl,(error,image)=>{
      this.mapboxMap.addImage(layerid,image);
      this.mapboxMap.addLayer({
        'id': layerid,
        'type': 'symbol',
        'source':  {
          'type':'geojson',
          'data':geoSource
        },
        'layout': {
          'icon-image': layerid,
          'icon-size':1,
          'text-field': ['get','index'],
          'text-font': ['MicrosoftYaHeiRegular'],
          'text-offset': [0, -.3],
          'text-anchor':'center',
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
    this.mapboxMap.setFilter('tag-layer', ['match', ['get', 'tagid'], ids.map((item)=> {
      return item
    }), false, true]);
  }
  toggleDetail(tagid:string):void{
    this.showTagDetail =true;
    this.getTagDetail(tagid);
  }

  /**
   * 查询标签详情
   * @param tagid
   */
  getTagDetail(tagid:string):void{
    this.signService.getTagDetail({tagid:tagid}).subscribe((result:tagDetailInfo)=>{
       this.tagDetailInfo = result;
    });
  }
  /**
   * 获取tag 列表
   * @param searchParams
   */
  getTags(searchParams:SearchParams):void{
    let params = null;
    if(!searchParams){
      params = this.defaultSearchParams;
    }else{
      params = searchParams;
    }
    this.signService.getTagList(params).subscribe((searchTagResult:searchTagResult)=>{
      this.tagList = searchTagResult;
      let geoSource = listWktToGeoJson(searchTagResult.list,'geom');
      this.drawTags(geoSource,'./assets/img/map/pin.png','tag-layer');
    });
  }
  getAllTagListPoint():void{
    this.signService.getAllTagListPoint(null).subscribe((tagList:Array<tagListItem> )=>{
     let geoSource = listWktToGeoJson(tagList,'geom');
     this.drawTags(geoSource,'./assets/img/map/icon_map_switch_others.png','all-tag-points')
    })
  }

}
