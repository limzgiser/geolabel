/*
 * @Author: your name
 * @Date: 2020-07-23 15:31:10
 * @LastEditTime: 2020-07-23 16:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cf-onemap-mapbox\src\app\cityfun\cityfun-services\mapbox-draw.service.ts
 */
import { Injectable } from '@angular/core';

import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import { CircleMode, DragCircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle';

import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';


@Injectable({
  providedIn: 'root'
})
export class MapboxDrawService {

  draw = null;
  constructor() {

  }

  getMapboxDraw(): MapboxDraw {
    return this.draw ? this.draw : (this.draw = new MapboxDraw({
      displayControlsDefault: false,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        draw_circle: CircleMode,
        drag_circle: DragCircleMode,
        direct_select: DirectMode,
        simple_select: SimpleSelectMode,
        draw_rectangle: DrawRectangle
      }
    }));
  }
  reset(mapboxmap) {
    if (this.draw){
      mapboxmap.removeControl(this.draw);
      this.draw = null;
    }
  }

}
