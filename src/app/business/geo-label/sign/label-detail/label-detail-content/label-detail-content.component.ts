import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { tagDetailInfo } from '../../../types';
import { NzMessageService } from 'ng-zorro-antd';
import { MapboxmapService } from 'src/app/cityfun/mapbox-map/service/mapboxmap.service';
import { listWktToGeoJson } from '../../../utils/main-format';

@Component({
  selector: 'lb-label-detail-content',
  templateUrl: './label-detail-content.component.html',
  styleUrls: ['./label-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelDetailContentComponent implements OnInit {
  @Input() data: tagDetailInfo = null;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<void>();
  map = null;
  constructor(
    private nzMessageService: NzMessageService,
    private mapboxmapService: MapboxmapService
  ) {}

  ngOnInit(): void {
    this. map = this.mapboxmapService.getMap();
   
    let geojson = listWktToGeoJson(this.data.graphs, 'geom');
    
    this. map .addSource('tag-geo', {
      type: 'geojson',
      data: geojson,
    });
    this. map .addLayer({
      id: 'line',
      type: 'line',
      source: 'tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], "LineString"],//
      paint: {
        'line-width': 2,
        'line-color': '#0076ff',
      },
    });
    this.map.addLayer({
      id: 'circle',
      type: 'circle',
      source: 'tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], 'Point'],
      paint: {
        'circle-radius': 4,
        'circle-color': '#0076ff',
      },
    });
 this.   map.addLayer({
      id: 'polygon',
      type: 'fill',
      source: 'tag-geo',
      layout: {},
      filter: ['==', ['get', 'geotype'], 'Polygon'],
      paint: {
        'fill-color': '#0076ff',
        'fill-opacity': 0.5,
      },
    });
  }

  editTag(): void {
    this.edit.emit();
  }
  cancel(): void {}
  confirm(): void {
    this.delete.emit(this.data.tagid);
  }
  ngOnDestroy(): void {
   this.map.removeLayer('line');
   this.map.removeLayer('circle');
   this.map.removeLayer('polygon')
   this.map.removeSource('tag-geo');
  }
}
