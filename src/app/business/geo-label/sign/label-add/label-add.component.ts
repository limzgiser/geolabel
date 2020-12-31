import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.scss'],
})
export class LabelAddComponent implements OnInit {
  dateRange = [];
  isOpen: boolean = true;
  value = '1234';
  radioValue = '私有';
  constructor() {}

  ngOnInit() {}
  closePancel(e) {
    this.isOpen = false;
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
