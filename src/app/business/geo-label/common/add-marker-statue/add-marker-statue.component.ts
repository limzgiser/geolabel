import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MarkerStatueItem } from '../../types';

@Component({
  selector: 'app-add-marker-statue',
  templateUrl: './add-marker-statue.component.html',
  styleUrls: ['./add-marker-statue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMarkerStatueComponent implements OnInit {
  constructor() {}

  @Input() selectIndex:number =  0 ;
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

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
