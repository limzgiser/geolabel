import { MapboxmapService } from './../mapbox-map/service/mapboxmap.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
const SURL = './assets/config/mapbox.style.config/base.map/base.config.json';

type dataType = {
  basemaps: Array<any>;
  images: Array<any>;
};

@Component({
  selector: 'app-map-image-list',
  templateUrl: './map-image-list.component.html',
  styleUrls: ['./map-image-list.component.scss'],
})
export class MapImageListComponent implements OnInit {
  @Input() type = '';
  constructor(
    private http: HttpClient,
    private mapboxmapService: MapboxmapService
  ) { }

  @Input() data = null;
  @Output() miClick = new EventEmitter<[string, number]>();
  mapboxglmap = null;

  ngOnInit() {

  }

  itemClick(item, index) {
    this.data.forEach((element) => {
      element.active = false;
    });
    item.active = true;
    this.miClick.emit([this.type, index]);
  }
  ngOnChanges(): void {


  }
}
