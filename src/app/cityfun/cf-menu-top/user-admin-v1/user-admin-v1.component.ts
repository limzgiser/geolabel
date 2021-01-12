/*
 * @Author: your name
 * @Date: 2019-12-19 08:53:23
 * @LastEditTime: 2020-07-28 16:39:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit.
 * @FilePath: \SCMPortal\src\app\business\sharecoms\user-admin-v1\user-admin-v1.component.ts
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin-v1',
  templateUrl: './user-admin-v1.component.html',
  styleUrls: ['./user-admin-v1.component.scss'],
})
export class UserAdminV1Component implements OnInit {
  constructor(private router: Router) { }
  logined = false;
  authInfo = null;
  public menuDropDown = false;
  isFullscreen: any = true;   // 全屏事件
  ngOnInit() {
    this.logined = this.isLogin();
    this.authInfo = JSON.parse(sessionStorage.getItem('authInfo'));

  }
  /**
   * 登录
   */
  login() {
    this.exit();
  }
  isLogin() {
    const authInfo: any = JSON.parse(sessionStorage.getItem('authInfo'));
    if (authInfo !== null && authInfo.islogin === true) {
      return true;
    } else {
      return false;
    }
  }
  exit() {
    sessionStorage.removeItem('authInfo');
    this.router.navigate(['login']);
  }
  switchFullScreen() {
    this.toggleFullscreen(null);

  }
  toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    const doc: any = document;

    this.isFullscreen = elem.requestFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  }
  showUserOperation($event) {
   this.menuDropDown = !this.menuDropDown;
    // jQuery($event.currentTarget).toggleClass('user-info-active');
    // jQuery('.user-operation').slideToggle(300);
  }
}
