import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-search',
  templateUrl: './label-search.component.html',
  styleUrls: ['./label-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelSearchComponent implements OnInit {

  dateRange = [];
  isOpen: boolean = true;
  constructor() {}

  ngOnInit() {}
  closePancel(e){
    this.isOpen = false;
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
