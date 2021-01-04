import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../../types';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor() {}

  @Input() navData: Array<NavItem> = [
    {
      title: '标记',
      type: 'appstore-add',
      select: true,
      path:'sign'
    },
    {
      title: '分类',
      type: 'appstore-add',
      select: false,
      path:'classify'
    },
    {
      title: '收藏',
      type: 'appstore-add',
      select: false,
      path:'collect'

    },
  ];
  selectItem: NavItem = this.navData[0];
  ngOnInit() {}
  itemClick(item: NavItem) {
     this.selectItem = item;
  }
}
