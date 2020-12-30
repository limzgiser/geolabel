import { MapboxmapService } from '../mapbox-map/service/mapboxmap.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mapbox-map-tool',
  templateUrl: './mapbox-map-tool.component.html',
  styleUrls: ['./mapbox-map-tool.component.scss']
})
export class MapToolComponent implements OnInit {

  constructor(private mapboxmapService: MapboxmapService) {

  }
  transFormStyle = {
    transform: "rotate(0deg)"
  };
  @Input()
  mockData = [
    // {
    //   name: "reset",                                     // label
    //   dimg: './assets/img/maptool/map_reset_default.png',   // 默认图标
    //   simg: './assets/img/maptool/map_reset_hover.png',     // 选中图标
    //   active: false,                                    //  当前选中状态
    // },
    {
      name: "2D",
      dimg: './assets/img/maptool/map_2d_default.png',
      simg: './assets/img/maptool/map_2d_hover.png',
      active: false,
    },
    {
      name: "3D",
      dimg: './assets/img/maptool/map_3d_default.png',
      simg: './assets/img/maptool/map_3d_hover.png',
      active: false,
    },
    {
      name: "compass",                                  // 指北针
      dimg: './assets/img/maptool/map_compass.png',
      simg: './assets/img/maptool/map_compass.png',
      active: false,
    }
  ];

  data = null;
  ngOnInit() {
    this.data = this.mockData;
    this.mapboxmapService.init().then((mapboxglmap: any) => {
      this.pitchChangeCallback();
      mapboxglmap.on("pitch", e => {
        this.pitchChangeCallback();
      });
    });
  }

  iclick(e) {
    let style = this.mapboxmapService.getMap().getStyle();
    switch (e.name) {
      case 'reset':
        this.mapboxmapService.getMap().flyTo({
          center: style.center,
          zoom: style.zoom,
          bearing: style.bearing || 0,
        });
        this.transFormStyle.transform = `rotate(${0}deg)`;
        break;
      case '2D':
        this.mapboxmapService.getMap().setPitch(45);
        break;
      case '3D':
        this.mapboxmapService.getMap().setPitch(0);
        break;
    }

  }
  mouseleave(e) {
    e.active = false;
  }
  mouseover(e) {
    e.active = true;
  }
  // 地图视角变化回调函数
  pitchChangeCallback() {
    const pitchInfo = {
      pitch: this.mapboxmapService.getMap().getPitch(),
      bearing: this.mapboxmapService.getMap().getBearing()
    };
    if (pitchInfo.bearing < 0) {
      pitchInfo.bearing = Math.abs(pitchInfo.bearing);
    } else {
      pitchInfo.bearing = -Math.abs(pitchInfo.bearing);
    }
    this.transFormStyle.transform = `rotate(${pitchInfo.bearing}deg)`;
    if (pitchInfo.pitch > 0) {
      this.data = (this.mockData.filter(item => {
        return item.name !== '2D';
      }));
    }
    if (pitchInfo.pitch === 0) {
      this.data = (this.mockData.filter(item => {
        return item.name !== '3D';
      }));
    }
  }
}
