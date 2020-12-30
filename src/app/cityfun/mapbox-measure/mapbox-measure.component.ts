import { MapboxDrawService } from './../cityfun-services/mapbox-draw.service';
import { MapboxmapService } from './../mapbox-map/service/mapboxmap.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as turf from '@turf/turf';
import {MapMeasure} from './measure'
@Component({
  selector: 'app-mapbox-measure',
  templateUrl: './mapbox-measure.component.html',
  styleUrls: ['./mapbox-measure.component.scss']
})
export class MapboxMeasureComponent implements OnInit {

  constructor(private mapboxmapService: MapboxmapService, private mapboxDrawService: MapboxDrawService) { }
  mapboxglmap = null;
  draw = null;
  startDraw = false; // 记录是否开始绘制
  drawCoorDinates = []; // 记录绘制坐标
  measureType: '' | 'length' | 'area' = '';
  pupup = null;
  reset = "001";
  @Output() clearMeasure = new EventEmitter<any>();
  mapMeasure: MapMeasure = null;
  data = [
    // {
    //   id: 'draw_line_string',
    //   title: '线'
    // },
    {
      id: 'full-ext',
      title: '全图',
      dimg: './assets/img/toolbar/maptool_full.png',
      simg: './assets/img/toolbar/maptool_full_select.png',
      active: false,
    },
    {
      id: 'draw_line_string',
      title: '测距',
      dimg: './assets/img/toolbar/maptool_dist.png',
      simg: './assets/img/toolbar/maptool_dist_select.png',
      active: false,
    },
    {
      id: 'draw_polygon',
      title: '测面',
      dimg: './assets/img/toolbar/btn_sps_plogon.png',
      simg: './assets/img/toolbar/btn_sps_plogon_select.png',
      active: false,
    },
    // {
    //   id: 'identify',
    //   title: '',
    //   dimg: './assets/img/toolbar/maptool_search.png',
    //   simg: './assets/img/toolbar/maptool_search_select.png',
    //   active: false,
    // },
    {
      id: 'delete',
      title: '删',
      dimg: './assets/img/toolbar/btn_sps_clear.png',
      simg: './assets/img/toolbar/btn_sps_clear_select.png',
      active: false,
    }
  ];
  ngOnInit() {
    this.mapboxmapService.init().then((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (mapboxglmap.isStyleLoaded() || this.mapboxmapService.firstFullLoaded) {
        this.init();
      }
      mapboxglmap.on('load', () => {
        this.init();
      });
    });
  }
  init() {
    this.mapMeasure = new MapMeasure(this.mapboxglmap);
    //   this.mapboxglmap.on('draw.create', updateArea.bind(this));
    //   // this.mapboxglmap.on('draw.delete', updateArea);
    //   // this.mapboxglmap.on('draw.update', updateArea);
    //   function updateArea(e) {

    //     this.startDraw = false;
    //     this.drawCoorDinates = [];
    //   }

    //   this.mapboxglmap.on('click', e => {
    //     const { lng, lat } = e.lngLat;
    //     if (this.startDraw) {
    //       this.drawCoorDinates.push([lng, lat]);

    //     }

    //   });
    //   this.mapboxglmap.on('dbclick', e => {
    //     const { lng, lat } = e.lngLat;
    //     if (this.startDraw) {
    //       this.drawCoorDinates.push([lng, lat]);

    //     }
    //   });

    //   this.mapboxglmap.on('mousemove', e => {

    //     const { lng, lat } = e.lngLat;
    //     if (this.startDraw) {
    //       let tmpCoordinates = [...this.drawCoorDinates, [lng, lat]];

    //       if (this.measureType === 'length' && tmpCoordinates.length > 1) {
    //         const length = this.measure(tmpCoordinates);
    //         if (this.pupup) {
    //           this.pupup.setLngLat([lng, lat])
    //             .setHTML(`${Math.floor(length * 100) / 100} km`).addTo(this.mapboxglmap);
    //         } else {
    //           this.pupup = new mapboxgl.Popup({
    //             closeButton: false,
    //             closeOnClick: false,
    //             // closeOnMove: true
    //           })
    //             .setLngLat([lng, lat])
    //             .setHTML(`${Math.floor(length * 100) / 100} km`)
    //             .addTo(this.mapboxglmap);
    //         }
    //       }
    //       if (this.measureType === 'area' && tmpCoordinates.length > 2) {
    //         tmpCoordinates = [...tmpCoordinates, tmpCoordinates[0]];
    //         const area = this.measure(tmpCoordinates);
    //         const polygon = turf.polygon([tmpCoordinates]);
    //         const center = turf.centerOfMass(polygon);
    //         if (this.pupup) {
    //           this.pupup.setLngLat(center.geometry.coordinates)
    //             .setHTML(`${Math.floor(area / 1000 / 1000 * 100) / 100} km<sup>2</sup>`).addTo(this.mapboxglmap);
    //         } else {
    //           this.pupup = new mapboxgl.Popup({
    //             closeButton: false,
    //             closeOnClick: false,
    //             // closeOnMove: true
    //           })
    //             .setLngLat(center.geometry.coordinates)
    //             .setHTML(`${Math.floor(area / 1000 / 1000 * 100) / 100} km<sup>2</sup>`)
    //             .addTo(this.mapboxglmap);
    //         }
    //       }
    //     }
    //   });
    // }
    // measure(coordinates) {
    // if (this.measureType === 'length' && coordinates.length && coordinates.length > 1) {
    //   let line = turf.lineString(coordinates);
    //   let length = turf.length(line, { units: 'kilometers' });

    //   return length || 0;
    // }
    // if (this.measureType === 'area' && coordinates.length && coordinates.length > 3) {
    //   let tmpCoordinates = [];
    //   if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] && coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
    //     tmpCoordinates = [...coordinates, coordinates[0]];
    //   } else {
    //     tmpCoordinates = coordinates;
    //   }
    //   let polygon = turf.polygon([tmpCoordinates]);
    //   const area = turf.area(polygon);
    //   return area;

    // }
  }

  drawClick(e) {
    // this.draw.deleteAll();
    this.mapboxDrawService.reset(this.mapboxglmap);
    this.draw = this.mapboxDrawService.getMapboxDraw();
    this.mapboxglmap.addControl(this.draw, 'top-right');
    this.pupup ? this.pupup.remove() : null;
    switch (e.id) {
      case 'full-ext':
        let style = this.mapboxmapService.getMap().getStyle();
        this.mapboxmapService.getMap().flyTo({
          center: style.center,
          zoom: style.zoom,
          bearing: style.bearing || 0,
        });
        this.restCacheCoors();
        this.reset += 1;
        break;
      case 'delete':
        this.restCacheCoors();
        this.draw.deleteAll();
        this.pupup ? this.pupup.remove() : null;
        this.mapMeasure && this.mapMeasure.clear();
        this.clearMeasure.emit(null);

        break;
      case 'draw_line_string':
        // this.drawCoorDinates = [];
        // this.startDraw = true;
        // this.measureType = 'length';
        // this.draw.changeMode(e.id);
        this.mapMeasure && this.mapMeasure.clear();
        this.mapMeasure && this.mapMeasure.measure('line');

        break;
      case 'draw_polygon':
        // this.drawCoorDinates = [];
        // this.startDraw = true;
        // this.measureType = 'area';
        // this.draw.changeMode(e.id);
        this.mapMeasure && this.mapMeasure.clear();
        this.mapMeasure && this.mapMeasure.measure('polygon');

        break;
      default:
        this.startDraw = false;
        this.draw.deleteAll();

    }
    // document.querySelector('body').style.cursor = 'pointer';
  }
  restCacheCoors() {
    this.startDraw = false;
    this.drawCoorDinates = [];
  }
  mouseenter(e) {
    this.data.forEach(i => { i.active = false; });
    e.active = true;
  }
  mouseleave(e) {
    e.active = false;
  }

}
