import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input, Output, EventEmitter,
} from '@angular/core';
import { ListLabelItem } from '../../types';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {SignComponent} from "../../sign/sign.component";
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
  @Input() labelList: Array<ListLabelItem> = [];
  @Output() hideFeature = new EventEmitter<ListLabelItem>();
  @Output() centerToFeature = new EventEmitter<ListLabelItem>();
  constructor() {}

  ngOnInit() {}
  togglePanel(show: boolean): void {
    // if (show) {
    //   this.showPanel = true;
    // } else {
    //   this.showPanel = false;
    // }
    show? this.showPanel = true: this.showPanel = false;
  }
  mouseenter(hoverItem:ListLabelItem):void{
   this.hoverItem = hoverItem;
  }
  mouseLeave():void{
    this.hoverItem = null;
  }
  hideItem(item:ListLabelItem):void{
    item.hidden = !item.hidden;
    this.hideFeature.emit(item);
  }
  centerToPointer(item:ListLabelItem){
   this.centerToFeature.emit(item)
  }

}
