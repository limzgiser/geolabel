import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Feature } from '@turf/turf';
import { FeatureListItem } from '../../../types';
import { EditToolService } from '../../edit-tool.service';

@Component({
  selector: 'app-label-feature',
  templateUrl: './label-feature.component.html',
  styleUrls: ['./label-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class LabelFeatureComponent implements OnInit {
  constructor(
    private editToolService: EditToolService,
    private datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  features: Array<FeatureListItem> = [];
  addsub = null;
  editsub = null;
  deletesub = null;
  ngOnInit() {
    this.addsub = this.editToolService.addFeature$.subscribe(
      (feature: Feature) => {
        const ttype: string = feature.geometry.type; // as 'Point' | 'LineString' | 'Polygon',
        this.features.push({
          feature: feature,
          title: `${ttype} - ${this.datePipe.transform(
            new Date(),
            'yyyy-MM-dd HH:mm:ss'
          )}`,
          type: ttype,
          des: '描述信息',
          icon: '',
        });
        this.changeDetectorRef.markForCheck();
      }
    );
    this.editsub = this.editToolService.editFeature$.subscribe(
      (feature: Feature) => {
        const ttype: string = feature.geometry.type;
        this.features.forEach((fItem: FeatureListItem) => {
          if (fItem.feature.id === feature.id) {
            fItem.feature = feature;
            fItem.title = `${ttype} - ${this.datePipe.transform(
              new Date(),
              'yyyy-MM-dd HH:mm:ss'
            )}`;
          }
        });
        this.changeDetectorRef.markForCheck();
      }
    );
  }
  ngOnDestroy(): void {
    this.editsub && this.editsub.unsubscribe();
    this.addsub && this.addsub.unsubscribe();
  }
}
