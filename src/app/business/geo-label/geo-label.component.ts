import { CoreMessageService } from './../../cityfun/cityfun-services/core-message.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { MapboxmapService } from './../../cityfun/mapbox-map/service/mapboxmap.service';
import { Subscription } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';
// import { ids } from './search-control/search.default.style';
import { HttpClient } from '@angular/common/http';

import { ModuleDataRxInquireService } from "@cmss/core";

@Component({
  selector: 'app-geo-label',
  templateUrl: './geo-label.component.html',
  styleUrls: ['./geo-label.component.scss']
})
export class GeoLabelComponent implements OnInit {

  constructor(private mapboxmapService: MapboxmapService,
    private dataRxInquireService: ModuleDataRxInquireService
    , private coreMessageService: CoreMessageService,
    private http: HttpClient) { }
  mapboxglmap = null;

  nodeInfo = null;  // 查询node节点信息
  sub: Subscription;
  treeNodeInfo = null;
  searchGeometry = null;
  
 
  
  ngOnInit() {

    this.sub = this.coreMessageService.nodemessage.subscribe((nodeinfo: any) => {
      this.treeNodeInfo = nodeinfo;
    });
    this.mapboxmapService.init().then((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (this.mapboxmapService.firstFullLoaded) {
        this.mapInit(1);
      }
      mapboxglmap.on('load', () => {
        // console.log('is first loaded 2 ');
        this.mapInit(2);

      });

      // if (mapboxglmap.isStyleLoaded()) {
      //   this.mapInit(1);
      // }
      // // 只执行一次
      // mapboxglmap.on('load', () => {
      //   this.mapInit(2);
      // });
      // this.drawPolygon();
      this.mapboxglmap = mapboxglmap;

    });

  }

 
  mapInit(type) {
    
  }
  drawEnd(data) {
    if (data) {
      this.searchGeometry = data.features[0].geometry;
    } else {
      this.searchGeometry = null;
    }
  }
  
  clearMeasure(e) {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
