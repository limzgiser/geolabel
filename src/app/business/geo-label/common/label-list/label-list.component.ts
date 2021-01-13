import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ListLabelItem } from '../../types';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listToggle', [
      transition(':enter', [
        style({
          opacity: 0,
          height: 0,
        }),
        animate(
          '.2s',
          style({
            opacity: 1,
            height: '*',
          })
        ),
      ]),
      transition(':leave', [
        style({
          overflow: 'hidden',
        }),
        animate(
          '.2s',
          style({
            opacity: 0,
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})

export class LabelListComponent implements OnInit {
  total = 12;
   hoverItem:ListLabelItem = null;
  showPanel: boolean = true;
  @Input() labelList: Array<ListLabelItem> = [
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'123cc'
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'11dcs'
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'1aw'
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'12c1'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'qe1'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'421'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'341'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'1123'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'212'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'10'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'11'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'12'
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
      id:'1222',

    }
  ];
  constructor() {}

  ngOnInit() {}
  togglePanel(show: boolean): void {
    if (show) {
      this.showPanel = true;
    } else {
      this.showPanel = false;
    }
  }
  mouseenter(hoverItem:ListLabelItem):void{
   this.hoverItem = hoverItem;
  }
  mouseLeave():void{
    this.hoverItem = null;
  }
  hideItem(item:ListLabelItem):void{
    item.hidden = !item.hidden;
  }
}
