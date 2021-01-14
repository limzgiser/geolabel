import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {tagDetailInfo} from "../../../types";

@Component({
  selector: 'lb-label-baseinfo',
  templateUrl: './label-baseinfo.component.html',
  styleUrls: ['./label-baseinfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelBaseinfoComponent implements OnInit {
  @Input() data:tagDetailInfo= null;
  constructor() { }

  ngOnInit(): void {
  }

}
