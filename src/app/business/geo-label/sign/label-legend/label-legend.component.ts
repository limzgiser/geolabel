import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {legentItem} from "../../types";

@Component({
  selector: 'lb-label-legend',
  templateUrl: './label-legend.component.html',
   styleUrls: ['./label-legend.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelLegendComponent implements OnInit {

  constructor() { }
  @Input() data=[
    {
      title:'我的',
      icon:'./assets/img/map/icon_map_switch_mine.png',
      active:true,
      id:'all-tag-points-my',

    },
    {
      title:'他人',
      icon:'./assets/img/map/icon_map_switch_others.png',
      active:true,
      id:'all-tag-points-other',
    }
  ];
  @Output() legendToggle  = new EventEmitter<legentItem>();
  ngOnInit(): void {
  }

  modelChange(item:legentItem){
    this.legendToggle.emit(item)
  }
}
