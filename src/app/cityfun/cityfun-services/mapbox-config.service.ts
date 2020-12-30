import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ModuleDataRxInquireService } from '@cmss/core';
@Injectable({
  providedIn: 'root'
})
export class MapboxConfigService {

  constructor(private dataRxInquireService: ModuleDataRxInquireService) { }


  mapboxmapConfig  = null;

  public getMapboxMapConfig() {
    return this.dataRxInquireService.get('mapbox', 'mapbox.map').pipe().toPromise();
  }

  public getData() {
    if (this.mapboxmapConfig) {
      return of(this.mapboxmapConfig).toPromise();
    }
    return this.getMapboxMapConfig().then(res => {
      this.mapboxmapConfig = res.data;
      return res.data;
    });
  }

  public getLayersInfoByAids(aids) {
    return this.getData().then(() => {
      const layersInfo = [];
      aids.forEach(aid => {
        const alayer = this.mapboxmapConfig.alayers.find(item => item.aid === aid);
        this.mapboxmapConfig.layers.forEach(layer => {
          if (alayer.layers.findIndex(i => i.id === layer.id) > -1) {
            layersInfo.push(layer);
          }
        });
      });
      return layersInfo;
    });
  }

}
