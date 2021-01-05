import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { NavItem } from '../../types';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.route.firstChild.data)
      )
      .subscribe((data:any) => {
        if (data.path) {
          this.selectItem = this.navData.find(
            (item: NavItem) => item.path === data.path
          );
        }
      });
  }

  @Input() navData: Array<NavItem> = [
    {
      title: '标记',
      type: 'appstore-add',
      select: true,
      path: 'sign',
    },
    {
      title: '分类',
      type: 'appstore-add',
      select: false,
      path: 'classify',
    },
    {
      title: '收藏',
      type: 'appstore-add',
      select: false,
      path: 'collect',
    },
  ];
  selectItem: NavItem = this.navData[0];
  ngOnInit() {}

  itemClick(item: NavItem) {
    this.selectItem = item;

    this.router.navigate([`./${item.path}`], { relativeTo: this.route });
  }
}
