import {Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-record',
  templateUrl: './msg-record.component.html',
  styleUrls: ['./msg-record.component.scss']
})
export class MsgRecordComponent implements OnInit {

  constructor() { }

  @Input() author:string = 'zhangs';
  @Input() content:string = ""
  ngOnInit() {
  }

}
