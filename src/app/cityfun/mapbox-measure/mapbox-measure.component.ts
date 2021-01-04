
import { MapboxmapService } from './../mapbox-map/service/mapboxmap.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MapMeasure} from './measure'
@Component({
  selector: 'app-mapbox-measure',
  templateUrl: './mapbox-measure.component.html',
  styleUrls: ['./mapbox-measure.component.scss']
})
export class MapboxMeasureComponent implements OnInit {

  constructor(private mapboxmapService: MapboxmapService,) { }
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
    
  }

  drawClick(e) {
    // this.draw.deleteAll();
    // this.mapboxDrawService.reset(this.mapboxglmap);
 
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
        this.pupup ? this.pupup.remove() : null;
        this.mapMeasure && this.mapMeasure.clear();
        this.clearMeasure.emit(null);

        break;
      case 'draw_line_string':
        this.mapMeasure && this.mapMeasure.clear();
        this.mapMeasure && this.mapMeasure.measure('line');

        break;
      case 'draw_polygon':
        this.mapMeasure && this.mapMeasure.clear();
        this.mapMeasure && this.mapMeasure.measure('polygon');

        break;
      default:
        this.startDraw = false;
        // this.draw.deleteAll();

    }

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
