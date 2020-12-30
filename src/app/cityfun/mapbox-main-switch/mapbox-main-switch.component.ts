import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapbox-main-switch',
  templateUrl: './mapbox-main-switch.component.html',
  styleUrls: ['./mapbox-main-switch.component.scss']
})
export class MapboxMainSwitchComponent implements OnInit {

  constructor() { }
  @Output() iclick = new EventEmitter<[string, number]>();
  @Output() iMouseEnter = new EventEmitter<[string, number]>();
  @Output() iMouseLeave = new EventEmitter<[string, number]>();
  data = [
    {
      title: "地图",
      dimg: "./assets/img/maptree/btn_mapMode_map.png",
      simg: "./assets/img/maptree/btn_mapMode_map_select.png",
      class: 'switch-map',
      active: false,
      type: "basemaps",
      index: 0,
    },
    {
      title: "影像",
      dimg: "./assets/img/maptree/btn_mapMode_sta.png",
      simg: "./assets/img/maptree/btn_mapMode_sta_select.png",
      class: 'switch-sta',
      active: false,
      index: 1,
      type: "images",
    },
    {
      title: "图层",
      dimg: "./assets/img/maptree/btn_mapMode_sta.png",
      simg: "./assets/img/maptree/btn_mapMode_sta_select.png",
      class: 'switch-layer',
      active: true,
      index: 2,
      type: "layers",
    }
  ]
  ngOnInit() {
  }
  itemClick(item) {
    this.data.forEach(e => {
      e.active = false;
    });
    item.active = true;
    this.iclick.emit([item.type, 0]);
  }
  mouseEnter(item) {
    if (item.active) {
      this.iMouseEnter.emit([item.type, 0]);
    }

  }
  mouseleave(item) {

    this.iMouseLeave.emit([item.type, 0]);
  }
}
