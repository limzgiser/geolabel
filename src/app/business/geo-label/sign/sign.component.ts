import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import mapboxgl from 'cityfun-gl';
import { MarkerStatue, offMapEvent, preventMapDefault } from '../utils/mapTool';
import { DOCUMENT } from '@angular/common';
import {
  legentItem,
  SearchParams,
  searchTagResult,
  tagDetailInfo,
  tagListItem,
} from '../types';
import { SignService } from './sign.service';
import { EditToolService } from './services/edit-tool.service';
import { listWktToGeoJson } from '../utils/main-format';
import { getAllTagsStyle, getSageNationTagsStyle } from './styles/style';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignComponent implements OnInit, OnDestroy {
  constructor(
    private mapboxMapService: MapboxmapService,
    @Inject(DOCUMENT) private doc: Document,
    private signService: SignService,
    private editToolService: EditToolService,
    private cdr: ChangeDetectorRef,
    private nzMessageService: NzMessageService,
    private appref: ApplicationRef,
    private route:ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
       this.modelName = data.path;
    });
  }
  modelName :'collect'|'sign' |'' = 'sign'
  toggleEditTool$ = null;
  mapboxMap: mapboxgl.Map = null;
  markerStatue: MarkerStatue = MarkerStatue.none; // 状态
  moveMarker: mapboxgl.Marker = null;
  editMarker: mapboxgl.Marker = null;
  showEditTool: boolean = false;
  showTagDetail: boolean = false;
  tagDetailInfo: tagDetailInfo = null;
  tagList: searchTagResult = null;
  totalCount: number = 0;
  isEdit: boolean = false;
  isTree = false;
  eventCallBack = {
    // key: function () {},
  };
  defaultSearchParams = {
    keyWord: '',
    categoryId: '',
    startTime: '',
    endTime: '',
    pageSize: 9,
    pageNo: 1,
  };

  xhrs = {};
  ngOnInit() {
   this.xhrs['mapInit'] = this.mapboxMapService
      .init()
      .subscribe((mapboxMap: any) => {
        this.mapboxMap = mapboxMap;
        if (
          mapboxMap.isStyleLoaded() &&
          this.mapboxMapService.firstFullLoaded
        ) {
          this.mapInit();
        }
        this.mapboxMap.on('load', () => {
          this.mapInit();
        });
        this.cdr.markForCheck();
      });
    this.toggleEditTool$ = this.editToolService.toggleTool$.subscribe(
      (isShow: boolean) => {
        this.showEditTool = isShow;
      }
    );
  }
  mapInit(): void {
    if(this.modelName == ''){
        return ;
    }
    this.bindMapEvent();
    this.addGroupLayer();
    this.getTags(null);
    this.getAllTagListPoint();
  }
  addGroupLayer() {
    this.mapboxMapService.removeLayerByIds([
      'cityfun.null.2',
      'cityfun.null.1',
    ]);
    this.mapboxMap.addLayer({
      id: 'cityfun.null.2',
      type: 'fill',
      source: {
        type: 'geojson',
        data: null,
      },
    });
    this.mapboxMap.addLayer({
      id: 'cityfun.null.1',
      type: 'line',
      source: {
        type: 'geojson',
        data: null,
      },
    });
  }
  bindMapEvent(): void {
    let self = this;
    offMapEvent(
      this.mapboxMap,
      'click',
      'search-tag-layer-click',
      this.eventCallBack,
      'search-tag-layer'
    );
    offMapEvent(
      this.mapboxMap,
      'click',
      'all-tag-points-my-click',
      this.eventCallBack,
      'all-tag-points-my'
    );
    offMapEvent(
      this.mapboxMap,
      'click',
      'all-tag-points-other-click',
      this.eventCallBack,
      'all-tag-points-other'
    );
    // 阻止点击事件多选要素
    this.eventCallBack['search-tag-layer-click'] = function (e) {
      // if (e.defaultPrevented) {
      //   return true;
      // }
      // e.preventDefault();
      if (e.features && e.features.length) {
        const { tagid } = e.features[0].properties;
        self.getTagDetail(tagid);
      }
    };
    this.eventCallBack['all-tag-points-my-click'] = function (e) {
      // if (e.defaultPrevented) {
      //   return true;
      // }
      // e.preventDefault();
      if (e.features && e.features.length) {
        const { tagid } = e.features[0].properties;
        self.getTagDetail(tagid);
      }
    };
    this.eventCallBack['all-tag-points-other-click'] = function (e) {
      // if (e.defaultPrevented) {
      //   return true;
      // }
      // e.preventDefault();
      if (e.features && e.features.length) {
        const { tagid } = e.features[0].properties;
        self.getTagDetail(tagid);
      }
    };
    this.mapboxMap.on(
      'click',
      'search-tag-layer',
      this.eventCallBack['search-tag-layer-click']
    );
    this.mapboxMap.on(
      'click',
      'all-tag-points-my',
      this.eventCallBack['all-tag-points-my-click']
    );
    this.mapboxMap.on(
      'click',
      'all-tag-points-other',
      this.eventCallBack['all-tag-points-other-click']
    );
  }
  /**
   * 添加标记
   */
  addMarker(): void {
    let self = this;
    this.markerStatue = MarkerStatue.moveing;
    this.mapboxMapService.setCursor('default');
    // 鼠标移动
    offMapEvent(
      this.mapboxMap,
      'mousemove',
      'mousemove-addTag',
      this.eventCallBack
    );
    // 鼠标点击
    offMapEvent(this.mapboxMap, 'click', 'click-map', this.eventCallBack);

    this.eventCallBack['mousemove-addTag'] = function (e) {
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], true);
    };
    this.eventCallBack['click-map'] = function (e) {
      self.tagDetailInfo = null;
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], false);
      self.mapboxMapService.setCursor('grab');
      self.markerStatue = MarkerStatue.editing;
      self.appref.tick();
      self.cdr.markForCheck();
      offMapEvent(
        self.mapboxMap,
        'mousemove',
        'mousemove-addTag',
        self.eventCallBack
      );
    };
    this.mapboxMap.on('mousemove', this.eventCallBack['mousemove-addTag']);
    this.mapboxMap.once('click', this.eventCallBack['click-map']);
  }
  /**
   * 停止标记
   */
  stopMarker(): void {
    offMapEvent(
      this.mapboxMap,
      'mousemove',
      'mousemove-addTag',
      this.eventCallBack
    );
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
  doSearch(searchParams: SearchParams) {
    this.getTags(searchParams);
  }
  closeDetail(): void {
    this.markerStatue = MarkerStatue.none;
    this.tagDetailInfo = null;
    this.getTags(null);
    // this.getAllTagListPoint();//
  }
  drawTags(style, iconUrl, layerid, beforeId): void {
    this.mapboxMapService.removeLayerByIds([layerid]);
    this.mapboxMap.loadImage(iconUrl, (error, image) => {
      this.mapboxMap.addImage(layerid, image);
      this.mapboxMap.addLayer(style, beforeId);
    });
  }

  hideTagFeatures(ids: Array<string>): void {
    if (ids.length <= 0) {
      this.mapboxMap.setFilter('search-tag-layer', null);
      return;
    }
    this.mapboxMap.setFilter('search-tag-layer', [
      'match',
      ['get', 'tagid'],
      ids.map((item) => {
        return item;
      }),
      false,
      true,
    ]);
  }
  toggleDetail(tagid: string): void {
    this.showTagDetail = true;
    this.getTagDetail(tagid);
  }
  /**
   * 查询标签详情
   * @param tagid
   */
  getTagDetail(tagid: string): void {
    this.markerStatue = MarkerStatue.none;
    this.signService
      .getTagDetail({ tagid: tagid })
      .subscribe((result: tagDetailInfo) => {
        if(!result){
          this.nzMessageService.error('获取详情失败!');
        }
        this.tagDetailInfo = result;
        this.appref.tick();
        this.cdr.markForCheck();
      });
  }
  /**
   * 获取tag 列表
   * @param searchParams
   */
  getTags(searchParams: SearchParams): void {
    let params = null;
    if (!searchParams) {
      params = this.defaultSearchParams;
    } else {
      params = searchParams;
    }
    let methods = this.modelName =='sign'?'getTagList':"getCollectList";
    this.xhrs['getTags'] =  this.signService[methods](params)
      .subscribe((searchTagResult: searchTagResult) => {
        this.tagList = searchTagResult;
        let geoSource = listWktToGeoJson(searchTagResult.list, 'geom');
        let style = getSageNationTagsStyle('search-tag-layer', geoSource);
        this.drawTags(
          style,
          './assets/img/map/pin.png',
          'search-tag-layer',
          'cityfun.null.1'
        );
        this.cdr.markForCheck();
      });
  }
  getAllTagListPoint(): void {
    let methods = this.modelName =='sign'?'getAllTagListPoint':"getAllCollecPoint";

    this.xhrs['getAllTagListPoint'] = this.signService
      [methods](null)
      .subscribe((tagList: Array<tagListItem>) => {
        let myTags = [],
          otherTags = [];
        tagList.forEach((item) => {
          if (item.status in [0, 1]) {
            myTags.push(item);
          } else {
            otherTags.push(item);
          }
        });
        let myTagSource = listWktToGeoJson(myTags, 'geom');
        let otherTagSource = listWktToGeoJson(otherTags, 'geom');
        let myTagStyle = getAllTagsStyle('all-tag-points-my', myTagSource);
        let otherTagStyle = getAllTagsStyle(
          'all-tag-points-other',
          otherTagSource
        );
        this.drawTags(
          myTagStyle,
          './assets/img/map/icon_map_switch_mine.png',
          'all-tag-points-my',
          'cityfun.null.2'
        );
        this.drawTags(
          otherTagStyle,
          './assets/img/map/icon_map_switch_others.png',
          'all-tag-points-other',
          'cityfun.null.2'
        );
        this.cdr.markForCheck();
      });
  }
  /**
   * 显隐图例对应图层
   * @param legnedIem
   */
  legendToggle(legnedIem: legentItem): void {
    let visibility = legnedIem.active ? 'visible' : 'none';
    this.mapboxMap.setLayoutProperty(legnedIem.id, 'visibility', visibility);
  }

  /**
   * 切换收藏状态
   * @param data
   */
  toggleSub(data: tagListItem) {
    let { tagid, issubscribe } = data;
    let msg = issubscribe == 1 ? '取消收藏' : '收藏';
    this.signService
      .toggleSub({
        tagid: tagid,
        isSubscribe: issubscribe == 1 ? 0 : 1,
      })
      .subscribe((res) => {
        this.cdr.markForCheck();
        if (res) {
          this.doSearch(null);
          this.nzMessageService.success(msg + '成功!');
        } else {
          this.nzMessageService.error(msg + '失败!');
        }
      });
  }
  ngOnDestroy(): void {
    this.modelName = '';
    this.mapboxMapService.removeLayerByIds([
      'all-tag-points-my',
      'all-tag-points-other',
      'search-tag-layer',
    ]);
    this.editMarker && this.editMarker.remove();
    this.moveMarker && this.moveMarker.remove();
     Object.keys(this.xhrs) .forEach(key=>{
       this.xhrs[key].unsubscribe();
     })
  }
}
