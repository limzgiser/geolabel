import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input, Output, EventEmitter,
} from '@angular/core';
import {searchTagResult, tagListItem} from '../../types';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
interface pageNationChangeInfo {
  currentPage:number;
  item:tagListItem
}
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
  imgs={
    0:'./assets/img/map/icon_list_private.png',
    1:'./assets/img/map/icon_list_public.png',
    2:'./assets/img/map/icon_list_private_others.png',
    3:'./assets/img/map/icon_list_public_others.png'
  }
  @Input()
  currentPage:number=1;
  @Input()
  pageSize:number =9;
  @Input()
  hoverItem:tagListItem = null;
  showPanel: boolean = true;
  @Input() labelList:  searchTagResult= null;
  @Output() hideFeature = new EventEmitter<tagListItem>();
  @Output() tagItemClick = new EventEmitter<tagListItem>();
  @Output() toggleSub = new EventEmitter<tagListItem>();
  @Output() pageItemClick = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}
  togglePanel(show: boolean): void {
    show? this.showPanel = true: this.showPanel = false;
  }
  mouseenter(hoverItem:tagListItem):void{
   this.hoverItem = hoverItem;
  }
  mouseLeave():void{
    this.hoverItem = null;
  }
  hideItem(item:tagListItem,e:MouseEvent):void{
    item.hidden = !item.hidden;
    this.hideFeature.emit(item);
    e.stopPropagation();
  }

  itemClick(item:tagListItem){
    this.tagItemClick.emit(item);
  }
  pageIndexChange(index:number):void{
     this.pageItemClick.emit(index);
  }
  toggleSubScribe(item:tagListItem,e){
    this.toggleSub.emit(item)
    e.stopPropagation();
  }
  trackById(index:number,item:tagListItem){
      return item.tagid;
  }
}
