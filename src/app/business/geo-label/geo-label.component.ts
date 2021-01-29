import { CoreMessageService } from './../../cityfun/cityfun-services/core-message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapboxmapService } from './../../cityfun/mapbox-map/service/mapboxmap.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CfhttpService} from "../../services/cfhttp.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-geo-label',
  templateUrl: './geo-label.component.html',
  styleUrls: ['./geo-label.component.scss']
})
export class GeoLabelComponent implements OnInit {

  constructor(private mapboxmapService: MapboxmapService,
    private cfHttp: CfhttpService
    , private coreMessageService: CoreMessageService,
    private http: HttpClient,
  
    ) { }
  mapboxglmap = null;
  nodeInfo = null;  // 查询node节点信息
  sub: Subscription;
  treeNodeInfo = null;
  searchGeometry = null;
  ngOnInit() {
    this.sub = this.coreMessageService.nodemessage.subscribe((nodeinfo: any) => {
      this.treeNodeInfo = nodeinfo;
    });
    this.mapboxmapService.init().subscribe((mapboxglmap: any) => {
      this.mapboxglmap = mapboxglmap;
      if (this.mapboxmapService.firstFullLoaded) {
        this.mapInit(1);
      }
      mapboxglmap.on('load', () => {

      });
      this.mapboxglmap = mapboxglmap;
    });
  }
  mapInit(type) {
  }

  clearMeasure(e) {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
