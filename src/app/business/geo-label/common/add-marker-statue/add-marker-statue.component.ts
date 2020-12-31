import { Component, OnInit, Input } from '@angular/core';
import { MarkerStatueItem } from '../../types';

@Component({
  selector: 'app-add-marker-statue',
  templateUrl: './add-marker-statue.component.html',
  styleUrls: ['./add-marker-statue.component.scss'],
})
export class AddMarkerStatueComponent implements OnInit {
  constructor() {}

  @Input() statues: Array<MarkerStatueItem> = [
    {
      title: '01-基本信息',
      id: '001',
    },
    {
      title: '01-标记要素',
      id: '002',
    },
    {
      title: '03-完成',
      id: '003',
    },
  ];
  selectItem:MarkerStatueItem =  this.statues[1];

  ngOnInit() {}
}
