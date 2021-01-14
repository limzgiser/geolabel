import {ChangeDetectionStrategy, Component, OnInit,Input} from '@angular/core';
import {LabelgeoFeature, tagListItem} from "../../../types";

@Component({
  selector: 'lb-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {

  @Input() data:LabelgeoFeature[]  =  [];
  constructor() { }

  ngOnInit(): void {
  }

}
