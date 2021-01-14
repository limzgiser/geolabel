import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {tagDetailInfo} from "../../../types";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'lb-label-detail-content',
  templateUrl: './label-detail-content.component.html',
  styleUrls: ['./label-detail-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDetailContentComponent implements OnInit {
  @Input() data:tagDetailInfo= null;
  @Output() delete = new EventEmitter<string>();
  constructor(private nzMessageService: NzMessageService) { }

  ngOnInit(): void {

  }

  editTag():void{

  }
  cancel(): void {

  }

  confirm(): void {
    this.delete.emit(this.data.tagid);
  }

}
