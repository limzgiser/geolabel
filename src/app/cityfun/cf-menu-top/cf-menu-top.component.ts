
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CfhttpService} from "../../services/cfhttp.service";

@Component({
  selector: 'app-cf-menu-top',
  templateUrl: './cf-menu-top.component.html',
  styleUrls: ['./cf-menu-top.component.scss']
})
export class CfMenuTopComponent implements OnInit {
  data = null;
  webetaInfo = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cfHttp: CfhttpService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
      if (event instanceof NavigationEnd) {
        const urlArr = event.urlAfterRedirects.split('/');
        const routerName = urlArr[urlArr.length - 1];
        this.initRouter(urlArr, routerName);
      }
    });
  }
  ngOnInit() {
    this.getMeta();
  }
  /**
 *
 * @ param routerName
 */
  private initRouter(routerArr, routerName) {
    // console.log(routerName);

    this.activeNavBarSelect(routerArr);
  }
  /**
  * 修改导航栏状态
  * @ param routerName
  */
  activeNavBarSelect(routerArr) {

    if (!this.data) {
      this.cfHttp.get('menu.config').subscribe(res => {

        this.data = { data: res.data };

        this.data.data.forEach(element => {
          if (routerArr.indexOf(element.id) >= 0) {
            element.selected = true;
          } else {
            element.selected = false;
          }
        });
      });
    } else {

      this.data.data.forEach(element => {
        if (routerArr.indexOf(element.id) >= 0) {
          element.selected = true;
        } else {
          element.selected = false;
        }
      });
    }

  }
  routerTo(e) {
    this.router.navigate([`./layout/${e.id}`]);
  }
  getMeta() {
    this.cfHttp.get('web.meta').subscribe((res) => {
      this.webetaInfo = res;
    });
  }
}
