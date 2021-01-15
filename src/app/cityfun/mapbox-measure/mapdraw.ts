import { lineString, polygon } from '@turf/turf';
import { throttle } from 'lodash';
import mapboxgl from 'cityfun-gl';
interface Point {
  lng: number;
  lat: number;
}

export class Mapdraw {
  // private
  private map: mapboxgl.Map;
  private stopD = false;
  private clickPoints: Array<Point> = []; // 点击选中的节点
  private movePoint: Point = null; // 当前移动点
  private endPoint: Point = null;
  private lineLayerId: string = 'draw-line-layer';
  private polygonLayerId: string = 'draw-polygon-layer';

  private drawType: 'line' | 'polygon' = 'line';
  private dbclick_callback = null;
  private click_callback = null;
  private mousemove_callback = null;
  constructor(map) {
    this.map = map;
    this.init();
  }

  init() {
    this.map.addLayer({

      type: 'line',
      source: {
        type: 'geojson',
        data: null,
      },
      paint: {
        'line-color': '#3bb2d0',
        'line-width': 2,
      },
    });
    this.map.addLayer({
      id: this.polygonLayerId,
      type: 'fill',
      source: {
        type: 'geojson',
        data: null,
      },
      paint: {
        'fill-color': '#3bb2d0',
        'fill-opacity': 0.3,
      },
    });
  }

  public draw(type, doubleClickCallback, mouseMoveCallback?) {
    this.resetDraw();
    this.drawType = type;
    this.bindDrawEvent(doubleClickCallback, mouseMoveCallback);
  }

  bindDrawEvent(callback, callback2?) {
    const self = this;
    // 取消事件订阅
    this.offEvent();

    this.dbclick_callback = function (e) {
      self.endPoint = e.lngLat;
      let result = [];
      switch (self.drawType) {
        case 'line':
          result = [...self.clickPoints, self.movePoint];
          break;
        case 'polygon':
          result = [
            ...self.clickPoints,
            self.movePoint,
            self.endPoint,
            self.clickPoints[0],
          ];
          break;
      }
      self.offEvent();
      self.drawGeoJSON(result);

      self.map.getCanvas().style.cursor = '';
      callback(result);
    };

    this.click_callback = function (e) {
      self.clickPoints.push(e.lngLat);
    };
    this.mousemove_callback = throttle(function (e) {
      self.map.getCanvas().style.cursor = 'crosshair';

      self.movePoint = e.lngLat;
      let coordinates = [];
      switch (self.drawType) {
        case 'line':
          coordinates = [...self.clickPoints, self.movePoint];
          break;
        case 'polygon':
          if (self.clickPoints.length < 2) {
            return;
          }
          coordinates = [
            ...self.clickPoints,
            self.movePoint,
            self.clickPoints[0],
          ];
      }
      self.drawGeoJSON(coordinates);
      callback2(coordinates);
    }, 200);
    this.map.on('dblclick', this.dbclick_callback);

    this.map.on('click', this.click_callback);

    this.map.on('mousemove', this.mousemove_callback);
  }
  private offEvent() {
    if (this.dbclick_callback) {
      this.map.off('dblclick', this.dbclick_callback);
    }
    if (this.click_callback) {
      this.map.off('click', this.click_callback);
    }
    if (this.mousemove_callback) {
      this.map.off('mousemove', this.mousemove_callback);
    }
  }
  drawGeoJSON(points: Array<Point>) {
    let geoJson = this.arrayToGeoJSON(points);
    switch (this.drawType) {
      case 'line':
        (<any>this.map.getSource(this.lineLayerId)).setData(geoJson);
        break;
      case 'polygon':
        (<any>this.map.getSource(this.lineLayerId)).setData(geoJson);
        if (points.length > 2) {
          (<any>this.map.getSource(this.polygonLayerId)).setData(geoJson);
        }
        break;
      default:
        break;
    }
  }

  // private create

  private arrayToGeoJSON(Points: Array<Point>) {
    const colloction = [];
    Points.forEach((point: Point) => {
      const { lng, lat } = point;
      colloction.push([lng, lat]);
    });
    switch (this.drawType) {
      case 'line':
        return Points.length > 1 ? lineString(colloction) : null;
      case 'polygon':
        return Points.length > 1 ? polygon([colloction]) : null;

      default:
        break;
    }
  }

  public clearSource() {
    (<any>this.map.getSource(this.lineLayerId)).setData({
      type: 'FeatureCollection',
      features: [],
    });
    (<any>this.map.getSource(this.polygonLayerId)).setData({
      type: 'FeatureCollection',
      features: [],
    });
  }
  private resetDraw() {
    this.clickPoints = [];
    this.movePoint = null;
    this.endPoint = null;
    this.clearSource();
  }
  private stopDraw() {
    this.stopD = true;
  }
  public clear() {
    this.resetDraw();
  }
}
