import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

// import * as  mapboxgl from 'mapbox-gl';

import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from 'mapbox-gl-draw-circle';
import { drawToolItem } from '../../types';
import { Feature, FeatureCollection } from '@turf/turf';
import { animate, style, transition, trigger } from '@angular/animations';
import { EditToolService } from '../edit-tool.service';
import {
  event_draw_create,
  event_draw_delete,
  event_draw_update,
  offMapEvent,
} from '../../utils/mapTool';
import { remove } from 'lodash';

@Component({
  selector: 'lb-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger('showEditToolAni', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '.2s',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(
          '.2s',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class EditToolComponent implements OnInit {
  mapboxglmap: mapboxgl.Map = null;
  mapboxDraw: MapboxDraw = null;
  selectIndex: number = -1;
  deletesub = null;
  @Input() tools: Array<drawToolItem> = [
    {
      label: '点',
      type: 'draw_point',
      defaultImg: './assets/img/map/icon_mark_point.png',
      selectImg: './assets/img/map/icon_mark_point_selected.png',
    },
    {
      label: '线',
      type: 'draw_line_string',
      defaultImg: './assets/img/map/icon_mark_line.png',
      selectImg: './assets/img/map/icon_mark_line_selected.png',
    },
    {
      label: '面',
      type: 'draw_polygon',
      defaultImg: './assets/img/map/icon_mark_rectangle.png',
      selectImg: './assets/img/map/icon_mark_rectangle_selected.png',
    },
    {
      label: '圆',
      type: 'drag_circle',
      defaultImg: './assets/img/map/icon_mark_circle.png',
      selectImg: './assets/img/map/icon_mark_circle_selected.png',
    },
    // {
    //   label: '矩形',
    //   type:'draw_rectangle',
    //   defaultImg:"./assets/img/map/icon_mark_circle.png",
    //   selectImg:"./assets/img/map/icon_mark_circle_selected.png"
    // },
  ];
  eventCallBack = {};
  constructor(
    private mapboxmapService: MapboxmapService,
    private cdr: ChangeDetectorRef,
    private editToolService: EditToolService
  ) {
    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (this.mapboxmapService.firstFullLoaded) {
        this.mapInit();
      }
      mapboxglmap.on('load', () => {
        this.mapInit();
      });
    });
  }

  ngOnInit(): void {}
  mapInit(): void {
    let self = this;
    function updateArea(data: any, type: 'create' | 'delete' | 'update') {
      self.cdr.markForCheck();
      self.selectIndex = -1;
      switch (type) {
        case 'create':
          self.editToolService.addFeature(data.features[0]);
          break;
        case 'delete':
          self.editToolService.deleteFeature(data.features[0]);
          break;
        case 'update':
          self.editToolService.editFeature(data.features[0]);
          break;
      }

      setTimeout(() => {
        self.mapboxmapService.setCursor('grab');
      }, 20);
    }
    this.mapboxDraw = new MapboxDraw({
      modes: {
        ...MapboxDraw.modes,
        draw_circle: CircleMode,
        drag_circle: DragCircleMode,
        draw_rectangle: DrawRectangle,
        direct_select: DirectMode,
        simple_select: SimpleSelectMode,
      },
    });
    this.mapboxglmap.addControl(this.mapboxDraw, 'bottom-right');
    this.eventCallBack[event_draw_create] = function (e) {
      updateArea(e, 'create');
    };
    this.eventCallBack[event_draw_update] = function (e) {
      updateArea(e, 'update');
    };
    this.eventCallBack[event_draw_delete] = function (e) {
      updateArea(e, 'delete');
    };

    this.mapboxglmap.on('draw.create', this.eventCallBack[event_draw_create]);
    this.mapboxglmap.on('draw.delete', this.eventCallBack[event_draw_delete]);
    this.mapboxglmap.on('draw.update', this.eventCallBack[event_draw_update]);


    this.deletesub = this.editToolService.deleteFeature$.subscribe(
      (feature: Feature) => {
         this.delete([feature.id as string]);
      }
    );
  }
  tooItemClick(item: drawToolItem, index: number): void {
    this.selectIndex = index;
    this.mapboxDraw.changeMode(item.type);
    setTimeout(() => {
      this.mapboxmapService.setCursor('crosshair');
    }, 5);
  }

  getSelectedIds(): Array<string> {
    return this.mapboxDraw.getSelectedIds();
  }
  deleteAll(): void {
    this.mapboxDraw.deleteAll();
  }

  delete(ids: string | Array<string>): void {
    this.mapboxDraw.delete(ids);
  }
  getAll(): FeatureCollection {
    return this.mapboxDraw.getAll();
  }
  ngOnDestroy(): void {
    if (this.mapboxDraw) {
      this.mapboxglmap.removeControl(this.mapboxDraw);
    }
    offMapEvent(
      this.mapboxglmap,
      'draw.create',
      event_draw_create,
      this.eventCallBack
    );
    offMapEvent(
      this.mapboxglmap,
      'draw.delete',
      event_draw_delete,
      this.eventCallBack
    );
    offMapEvent(
      this.mapboxglmap,
      'draw.update',
      event_draw_update,
      this.eventCallBack
    );
  }
}
