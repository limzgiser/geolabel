import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'lb-label-detail-content',
  templateUrl: './label-detail-content.component.html',
  styleUrls: ['./label-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDetailContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
