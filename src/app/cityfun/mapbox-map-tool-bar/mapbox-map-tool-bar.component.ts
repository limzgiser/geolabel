import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapbox-map-tool-bar',
  templateUrl: './mapbox-map-tool-bar.component.html',
  styleUrls: ['./mapbox-map-tool-bar.component.scss']
})
export class MapboxMapToolBarComponent implements OnInit {

  constructor() { }

  data = [
    {
      type: "full",
      title: "全图",
      dimg: "./assets/img/oltoolbar/maptool_full.png",
      simg: "./assets/img/oltoolbar/maptool_full_select.png",
      id: 0,
      hover: false
    }, {
      type: "zoomin",
      title: "放大",
      dimg: "./assets/img/oltoolbar/maptool_roomin.png",
      simg: "./assets/img/oltoolbar/maptool_roomin_select.png",
      id: 1
    }, {
      type: "zoomout",
      title: "缩小",
      dimg: "./assets/img/oltoolbar/maptool_zoomout.png",
      simg: "./assets/img/oltoolbar/maptool_zoomout_select.png",
      id: 2
    }, {
      type: "measure-len",
      title: "测距",
      dimg: "./assets/img/oltoolbar/maptool_dist.png",
      simg: "./assets/img/oltoolbar/maptool_dist_select.png",
      id: 3
    }, {
      type: "measure-area",
      title: "测面",
      dimg: "./assets/img/oltoolbar/maptool_rect.png",
      simg: "./assets/img/oltoolbar/maptool_rect_select.png",
      id: 4
    }, {
      type: "clear",
      title: "clear",
      dimg: "./assets/img/oltoolbar/maptool_clear.png",
      simg: "./assets/img/oltoolbar/maptool_clear_select.png",
      id: 5
    }
  ];
  ngOnInit() {
  }
  mouseenter(item) {
    item.hover = true;
  }
  mouseleave(item) {
    item.hover = false;
  }
  itemClick(item) {
    switch (item.type) {
      case 'full':
        //  this.olService.setMapExtent();
        break;
      case 'zoomin':
        //    this.olService.zoomIn();
        break;
      case 'zoomout':
        //  this.olService.zoomOut();
        break;
      case 'measure-len':
        //   this.olService.measureLength();
        break;
      case 'measure-area':
        //   this.olService.measureArea();
        break;
      case 'clear':
        //   this.olService.removeMapLayer('measure-vector');
        //   this.olService.getMap().getOverlays().clear();
        break;
    }
  }

}
