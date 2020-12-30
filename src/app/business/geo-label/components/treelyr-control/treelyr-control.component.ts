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
    this.mapboxmapService.init().then((mapboxglmap: any) => {
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

  mapInit() {
    if (this[this.type]) {
      const item = this[this.type].find(item => item.active);
      if (item) {
        this.changeBaseMap(item);
      }
    } else {
      this.getData().subscribe((res: any) => {
        this.basemaps = res.basemaps;
        this.images = res.images;
        this.basemaps[0].active = true;
        this.images[0].active = true;
        const item = this[this.type].find(item => item.active);
        if (item) {
          this.changeBaseMap(item);
        }
      });
    }

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
    this.removeBaseLayer();
    this.mapboxmapService.addMapStyle(style, { baseMap: true });
  }
  removeBaseLayer() {
    const baseStyleJson = this.mapboxglmap.getStyle();
    const removeLayers = [];
    for (let item of baseStyleJson.layers) {
      if (item.id === 'sp-layer-fill') {
        break;
      }
      removeLayers.push(item);
    }
    const removeSource = new Set();
    for (const layer of removeLayers) {

      if (this.mapboxglmap.getLayer(layer.id)) {
        this.mapboxglmap.removeLayer(layer.id);
        removeSource.add(layer.source);
      }
    }
    Array.from(removeSource).forEach(key => {
      if (this.mapboxglmap.getSource(key)) {
        this.mapboxglmap.removeSource(key);
      }
    });
  }
  showLegend(legends) {
      console.log(legends);
  }
  mapImgClick(event) {
    let [type, index] = event;
    this.changeBaseMap(this[type][index]);
  }

  getData() {
    return this.http.get(SURL);
  }
}
