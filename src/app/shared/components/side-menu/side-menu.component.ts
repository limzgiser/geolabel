import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModuleDataRxInquireService } from '@cmss/core';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  menus = [];
  constructor(private router: Router, private dataRxInquireService: ModuleDataRxInquireService) { }
  isCollapsed = true;

  @Output() sideBarEventEmitter = new EventEmitter<any>();
  // @Input()
  selectValue = null;
  menuList = [];
  ngOnInit() {
    this.getConfigData();
  }
  private getConfigData() {
    this.dataRxInquireService.get('cf', 'menu.config').subscribe(res => {
      this.menus = res.data;
    });
  }

  muneClick(item) {
    console.log(item)
    // this.router.navigate([`/business/${jtem.value}`]);
  }

}
