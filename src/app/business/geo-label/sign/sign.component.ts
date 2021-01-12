import { Component, OnInit, Inject } from '@angular/core';
import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import * as mapboxgl from 'mapbox-gl';
import { point, featureCollection } from '@turf/turf';
import {
  event_mousemove_key,
  offMapEvent,
  event_click_key,
  MarkerStatue,
} from '../utils/mapTool';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(
    private mapboxmapService: MapboxmapService,
    @Inject(DOCUMENT) private doc: Document
  ) {}
  mapboxmap: mapboxgl.Map = null;
  markerStatue: MarkerStatue = MarkerStatue.none; // 状态
  moveMarker: mapboxgl.Marker = null;
  editMarker: mapboxgl.Marker = null;
  showEditTool:boolean = false;
  eventCallBack = {
    // key: function () {},
  };
  ngOnInit() {
    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxmap = mapboxglmap;
      if (
        mapboxglmap.isStyleLoaded() ||
        this.mapboxmapService.firstFullLoaded
      ) {
        this.mapInit();
      }
      mapboxglmap.on('load', () => {
        this.mapInit();
      });
    });
  }
  mapInit() {
    this.bindMapEvent();
  }

  bindMapEvent() {}
  /**
   * 添加标记
   */
  addMarker(): void {
    let self = this;
    this.markerStatue = MarkerStatue.moveing;
    this.mapboxmapService.setCursor('default');
    offMapEvent(
      this.mapboxmap,
      'mousemove',
      event_mousemove_key,
      this.eventCallBack
    );
    this.eventCallBack[event_mousemove_key] = function (e) {
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], true);
    };
    this.mapboxmap.on('mousemove', this.eventCallBack[event_mousemove_key]);

    offMapEvent(this.mapboxmap, 'click', event_click_key, this.eventCallBack);

    this.eventCallBack[event_click_key] = function (e) {
      self.markerStatue = MarkerStatue.editing;
      let { lng, lat } = e.lngLat;
      self.addMoveMarker([lng, lat], false);
      self.mapboxmapService.setCursor('grab');
      offMapEvent(
        self.mapboxmap,
        'mousemove',
        event_mousemove_key,
        self.eventCallBack
      );
    };
    this.mapboxmap.once('click', this.eventCallBack[event_click_key]);
  }
  /**
   * 停止标记
   */
  stopMarker(): void {
    offMapEvent(
      this.mapboxmap,
      'mousemove',
      event_mousemove_key,
      this.eventCallBack
    );
    //  offMapEvent(this.mapboxmap, 'click', event_click_key, this.eventCallBack);
    this.markerStatue = MarkerStatue.none;
    if (this.moveMarker) {
      this.moveMarker.remove();
      this.moveMarker = null;
    }
    if (this.editMarker) {
      this.editMarker.remove();
      this.editMarker = null;
    }
    this.mapboxmapService.setCursor('default');
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
          .addTo(this.mapboxmap);
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
          .addTo(this.mapboxmap);
      }
    }
  }

  toggleEditTool(isShow:boolean):void{
    this.showEditTool = isShow;
  }
}
