import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { Mapdraw } from "./mapdraw";

export class MapMeasure {
  map = null;
  draw = null;
  measureType: 'line' | 'polygon' = 'line';
  pupup = null;
  constructor(map) {
    this.map = map;
    this.draw = new Mapdraw(map);
  }
  public measure(type: 'line' | 'polygon') {
    this.measureType = type;
    this.draw.draw(type, e => {
      // console.log(e);  // double click

    }, e2 => {

      const { lng, lat } = e2[e2.length - 1];
      if (this.measureType === 'line' && e2.length > 1) {
        const length = this.getCaculateValue(e2);

        if (this.pupup) {
          this.pupup.setLngLat([lng, lat])
            .setHTML(`${Math.floor(length * 100) / 100} km`).addTo(this.map);
        } else {
          this.pupup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            // closeOnMove: true
          })
            .setLngLat([lng, lat])
            .setHTML(`${Math.floor(length * 100) / 100} km`)
            .addTo(this.map);
        }
      }
      if (this.measureType === 'polygon' && e2.length > 2) {

        const area = this.getCaculateValue(e2);
        let tmpCoordinates = e2.map(item => { return [item.lng, item.lat]; })
        const polygon = turf.polygon([tmpCoordinates]);
        const center = turf.centerOfMass(polygon);
        if (this.pupup) {
          this.pupup.setLngLat(center.geometry.coordinates)
            .setHTML(`${Math.floor(area / 1000 / 1000 * 100) / 100} km<sup>2</sup>`).addTo(this.map);
        } else {
          this.pupup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            // closeOnMove: true
          })
            .setLngLat(center.geometry.coordinates)
            .setHTML(`${Math.floor(area / 1000 / 1000 * 100) / 100} km<sup>2</sup>`)
            .addTo(this.map);
        }
      }
    });
  }

  getCaculateValue(points) {
    let coordinates = points.map(item => { return [item.lng, item.lat]; });
    let res = this.measureCoor(coordinates);
    return res;
  }

  measureCoor(coordinates) {
    if (this.measureType === 'line' && coordinates.length && coordinates.length > 1) {
      let line = turf.lineString(coordinates);
      let length = turf.length(line, { units: 'kilometers' });
      return length || 0;
    }
    if (this.measureType === 'polygon' && coordinates.length && coordinates.length > 3) {
      let tmpCoordinates = [];
      if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] && coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        tmpCoordinates = [...coordinates, coordinates[0]];
      } else {
        tmpCoordinates = coordinates;
      }
      let polygon = turf.polygon([tmpCoordinates]);
      const area = turf.area(polygon);
      return area;
    }
  }

  clear() {
    if (this.pupup) {
      this.pupup.remove();
    }
    this.draw.clear();
  }
}
