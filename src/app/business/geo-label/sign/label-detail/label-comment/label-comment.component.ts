import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { listWktToGeoJson } from '../../../utils/main-format';
import { SignService } from '../../sign.service';

@Component({
  selector: 'lb-label-comment',
  templateUrl: './label-comment.component.html',
  styleUrls: ['./label-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelCommentComponent implements OnInit {
  comentMesg: string = '';
  replayMesg: string = '';
  selectItem = null;
  @Input() tagId = '';
  topicCount: number = 0;
  topicTrees = [];
  constructor(
    private signService: SignService,
    private cdr: ChangeDetectorRef,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getCommand();
  }
  getCommand() {
    this.signService
      .getCommandList({
        tagId: this.tagId,
      })
      .subscribe((result) => {
        if (!result) {
          this.nzMessageService.error('获取评论信息失败!');
        } else {
          // topicCount
          this.topicCount = result.topicCount;
          this.topicTrees = result.topicTrees;
          this.cdr.markForCheck();
        }
      });
  }

  publish(isRoot) {
    let content = '';
    if (isRoot) {
      content = this.comentMesg;
    } else {
      content = this.replayMesg;
    }
    let params  =    {
      tagid: this.tagId,
      content: this.comentMesg,
      isroot: 1,
      replyaccount: '',
      replytopicid: '',
    };;
 
    if (this.selectItem) {
      let { tagid, isroot, replytopicid ,replyaccount} = this.selectItem;
      params = {
        tagid: tagid,
        content: content,
        isroot: isroot,
        replyaccount: replyaccount,
        replytopicid: replytopicid,
      };
    }

    this.signService.makeCommand(params).subscribe((result) => {
      if (result) {
        this.nzMessageService.success('评论成功!');
        this.getCommand();
      } else {
        this.nzMessageService.error('评论失败!');
      }
    });
    this.selectItem = null;
    this.replayMesg = '';
    this.comentMesg = '';
  }
  reply(item) {
    this.selectItem = item;
    console.log(23);
    
  }
  cancel() {
    this.selectItem = null;
  }
 
  deleteComment(topicid:string,e:MouseEvent,){

    this.signService.deleteCommand({
      topicid:topicid,
    }).subscribe(result=>{
      if(result){
        this.nzMessageService.success('删除成功!');
        this.getCommand();
      }else{
        this.nzMessageService.error('删除失败!');
      }
    })    
  }
}
