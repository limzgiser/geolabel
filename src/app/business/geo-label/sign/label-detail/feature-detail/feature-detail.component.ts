import {ChangeDetectionStrategy, Component, OnInit,Input} from '@angular/core';
import {LabelgeoFeature, tagListItem} from "../../../types";
import {listWktToGeoJson} from "../../../utils/main-format";
import {MapboxmapService} from "../../../../../cityfun/mapbox-map/service/mapboxmap.service";

@Component({
  selector: 'lb-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {

  @Input() data:LabelgeoFeature[]  =  [];
  map = null;
  constructor(private  mapboxmapService:MapboxmapService) { }

  ngOnInit(): void {
  }
   initMap( data){
    this.removelayer();
    this. map = this.mapboxmapService.getMap();
    let geojson = listWktToGeoJson(data ,'geom');
    this. map .addSource('height-tag-geo', { type: 'geojson', data: geojson,  });
    this. map .addLayer({
      id: 'height-line',
      type: 'line',
      source: 'height-tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], "LineString"],//
      paint: {
        'line-width': 2,
        'line-color': 'red',
      },
    });
    this.map.addLayer({
      id: 'height-circle',
      type: 'circle',
      source: 'height-tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], 'Point'],
      paint: {
        'circle-radius': 4,
        'circle-color': 'red',
      },
    });
    this.   map.addLayer({
      id: 'height-polygon',
      type: 'fill',
      source: 'height-tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], 'Polygon'],
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.5,
      },
    });
  }
  removelayer(){
    if(this.map){
      this.map.removeLayer('height-line');
      this.map.removeLayer('height-circle');
      this.map.removeLayer('height-polygon')
      this.map.removeSource('height-tag-geo');
    }
  }
  featureItemClick(item){
    this.initMap([item]);
  }
  ngOnDestroy(): void {
    this.removelayer()
  }
}
