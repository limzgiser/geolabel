import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { labelItem } from '../../types';
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

  showPanel: boolean = true;
  @Input() labelList: Array<labelItem> = [
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    },
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
    } ,
    {
      title: '苏沪线点位注意事项',
      type: '0',
      collected: true,
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
}
