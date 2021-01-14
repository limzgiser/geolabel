import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lb-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDetailComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

}
