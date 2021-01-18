import { MapboxmapService } from '../../../../cityfun/mapbox-map/service/mapboxmap.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const SURL = './assets/config/mapbox.style.config/base.map/base.config.json';
@Component({
  selector: 'app-treelyr-control',
  templateUrl: './treelyr-control.component.html',
  styleUrls: ['./treelyr-control.component.scss']
})
export class TreelyrControlComponent implements OnInit {
  type: ("basemaps" | "images") = 'basemaps';
  showIndex = -1;
  // layerListData = null;
  basemaps = null;
  images = null;
  mapboxglmap = null;
  constructor(private http: HttpClient, private mapboxmapService: MapboxmapService) { }

  ngOnInit() {
    this.getData().subscribe((res: any) => {
      this.basemaps = res.basemaps;
      this.images = res.images;
      this.basemaps[0].active = true;
      this.images[0].active = true;
    });
    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (mapboxglmap.isStyleLoaded()) {
        // this.mapInit();
      } else {
        mapboxglmap.on('load', () => {
          //   this.mapInit();
        });
      }
    });
  }

  switchClick(event) {
    this.showIndex = this.getShowIndexByType(event[0]);
    if (event[0] === 'layers') {
      return;
    }
    const activeInte = this[event[0]].find(i => { return i.active; });
    this.changeBaseMap(activeInte);
  }
  switchMouseEnter(event) {

    this.showIndex = this.getShowIndexByType(event[0]);
  }
  toggleList(state: 'show' | 'hide') {
    this.showIndex = -1;
  }
  resetSwitchLayer() {
    this.images.forEach(element => {
      element.active = false;
    });
    this.images[0].active = true;
    this.basemaps.forEach(element => {
      element.active = false;
    });
    this.basemaps[0].active = true;
  }
  // 显示类别更具索引
  getShowIndexByType(type) {
    switch (type) {
      case 'basemaps':
        return 0;
      case 'images':
        return 1;
      case 'layers':
        return 2;
    }
  }
  changeBaseMap(baseItem) {
    const { style } = baseItem;
    this.mapboxglmap.loadMapStyle(style).then(styleObj=>{
        delete styleObj.center;
        delete styleObj.zoom;
        this.mapboxglmap.changeBaseMap(styleObj,{
          styleid: 'base.map',
          isBaseMap:true,
        });

    });
  }

  showLegend(legends) {
     // console.log(legends);
  }
  mapImgClick(event) {
    let [type, index] = event;
    this.changeBaseMap(this[type][index]);
  }

  getData() {
    return this.http.get(SURL);
  }
}
