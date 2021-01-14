
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LabelAddComponent implements OnInit {
  isOpen: boolean = true;
  constructor() {
  }
  closeContainer():void {
    this.isOpen = false;
  }

  ngOnInit(): void {
  }
}
