import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout01',
  templateUrl: './layout01.component.html',
  styleUrls: ['./layout01.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class Layout01Component implements OnInit {

  constructor() { }

  isInMicroApp = false;
  ngOnInit() {
     this.isInMicroApp = window['__POWERED_BY_QIANKUN__'];
  }
}
