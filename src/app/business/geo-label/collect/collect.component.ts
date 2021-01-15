import { Component, OnInit } from '@angular/core';
import { tagDetailInfo } from '../types';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {

  constructor() { }
  isEdit = false;
  tagDetailInfo: tagDetailInfo = null;
  
  ngOnInit() {
  }
  closeDetail(){

  }
}
