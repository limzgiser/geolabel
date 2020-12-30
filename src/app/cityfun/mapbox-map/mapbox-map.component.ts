import { HttpClient } from '@angular/common/http';
import { MapboxmapService } from './service/mapboxmap.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
// mapboxmapService
@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.scss']
})
export class MapboxMapComponent implements OnInit, OnDestroy {
  constructor(private mapboxmapService: MapboxmapService, private http: HttpClient) { }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.mapboxmapService.mapboxmap = null;
    this.mapboxmapService.specialStyel = null;
  }
}
