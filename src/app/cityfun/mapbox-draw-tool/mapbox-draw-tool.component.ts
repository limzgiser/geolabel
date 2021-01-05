import { EventEmitter } from '@angular/core';
// import { MapboxDrawService } from './../cityfun-services/mapbox-draw.service';
import { MapboxmapService } from './../mapbox-map/service/mapboxmap.service';
import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-mapbox-draw-tool',
  templateUrl: './mapbox-draw-tool.component.html',
  styleUrls: ['./mapbox-draw-tool.component.scss']
})
export class MapboxDrawToolComponent implements OnInit {
  constructor(private mapboxmapService: MapboxmapService, ) { }
  mapboxglmap = null;
  draw = null;
  @Output() drawEnd = new EventEmitter<any>();
  tmp = 0;
  data = [
    // {
    //   id: 'draw_line_string',
    //   title: '线'
    // },
    {
      id: 'draw_rectangle',
      title: '矩形',


      dimg: './assets/img/toolbar/btn_sps_rect.png',
      simg: './assets/img/toolbar/btn_sps_rect_select.png',
      active: false,
    },
    {
      id: 'drag_circle',
      title: '圆',
      dimg: './assets/img/toolbar/btn_sps_circle.png',
      simg: './assets/img/toolbar/btn_sps_circle_select.png',
      active: false,
    },
    {
      id: 'draw_polygon',
      title: '面',
      dimg: './assets/img/toolbar/btn_sps_plogon.png',
      simg: './assets/img/toolbar/btn_sps_plogon_select.png',
      active: false,
    },
    {
      id: 'delete',
      title: '删',
      dimg: './assets/img/toolbar/btn_sps_clear.png',
      simg: './assets/img/toolbar/btn_sps_clear_select.png',
      active: false,
    }
  ];
  ngOnInit() {
    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (mapboxglmap.isStyleLoaded()) {
        this.init();
      } else {
        mapboxglmap.on('load', () => {
          this.init();
        });
      }
    });
  }
  init() {
    const self = this;
    this.mapboxglmap.on('draw.create', updateArea);
    this.mapboxglmap.on('draw.delete', updateArea);
    this.mapboxglmap.on('draw.update', updateArea);
    function updateArea(e) {
      if (self.tmp === 1) {
        self.drawEnd.emit(e);
        self.tmp = 0;
      }


    }
  }

  drawClick(e) {
    this.tmp = 1;
    // this.draw.deleteAll();
    // this.mapboxDrawService.reset(this.mapboxglmap);
    // this.draw = this.mapboxDrawService.getMapboxDraw();
    // this.mapboxglmap.addControl(this.draw, 'top-right');

    switch (e.id) {
      case 'delete':
        // this.draw.deleteAll();
        // if (this.tmp === 1) {
        //   this.drawEnd.emit(null);
        //   this.tmp = 0;
        // }
        break;
      default:
        // this.draw.changeMode(e.id);


    }
    document.querySelector('body').style.cursor = 'pointer';
  }
  mouseenter(e) {
    this.data.forEach(i => { i.active = false; });
    e.active = true;
  }
  mouseleave(e) {
    e.active = false;
  }

}
