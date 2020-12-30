import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  @Input() style = null;
  @Output() routerToEmitter = new EventEmitter<any>();
  @Input() data = null;
  @Input() webetaInfo = null;
  ngOnInit() {
  }
  menuRouter(item) {
    this.data.data.forEach(i => { i.active = false; });
    item.active = true;
    this.routerToEmitter.emit(item);
  }

}
