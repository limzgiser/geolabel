import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {tagDetailInfo} from "../../types";
import {SignService} from "../sign.service";
import {NzMessageService} from "ng-zorro-antd/message";
@Component({
  selector: 'lb-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelDetailComponent implements OnInit {

  @Input() data:tagDetailInfo= null;
  @Output() close = new EventEmitter<void>();

  constructor(private signService:SignService,
              private cdr:ChangeDetectorRef,
              private nzMessageService:NzMessageService
  ) { }


  ngOnInit(): void {

  }
  hide():void{
    this.close.emit();
  }
  deleteTag(tagid:string):void{
    this.signService.deleteTag({tagid:tagid}).subscribe((result:boolean)=>{
      if(result){
        this.cdr.markForCheck();
        this.nzMessageService.success('删除成功!');
        this.close.emit();
      }else{
        this.nzMessageService.error('删除失败!');
      }
    })

  }
}
