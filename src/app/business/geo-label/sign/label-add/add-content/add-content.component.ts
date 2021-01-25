import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BaseInfoComponent} from "../base-info/base-info.component";
import {LabelFeatureComponent} from "../label-feature/label-feature.component";
import {LabelBaseInfo, soureTagInfo, tagDetailInfo} from "../../../types";
import {SignComponent} from "../../sign.component";
import {SignService} from "../../sign.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {cloneDeep} from "lodash";
import {sourceTagToParams} from "../../../utils/main-format";
import {EditToolService} from "../../services/edit-tool.service";

@Component({
  selector: 'lb-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContentComponent implements OnInit ,OnDestroy{

  @Input() isEdit =false;
  @Input()
  tagId:string = '';
  addStatueIndex: number = 0;
  addTagSuccess:boolean = true;
  @Output() showEditToolEvent = new EventEmitter<boolean>();
  @ViewChild('baseInfoComponent', { static: false }) private baseInfoComponent: BaseInfoComponent;
  @ViewChild('labelFeatureComponent',{static:false}) private  labelFeatureComponent:LabelFeatureComponent;
  @Output() showDetail = new EventEmitter<void>();
  @Input()  addSourceInfo :soureTagInfo = {
    baseInfo: null,
    graphs: [],
  };
  constructor(private  signComponent:SignComponent,
              private  signService:SignService,
              private  mzMessageService: NzMessageService,
              private  cdr :ChangeDetectorRef,
              private  editToolService:EditToolService
  ) {
  }
  ngOnInit() {

  }
  nextClick(): void {
    switch (this.addStatueIndex) {
      case 0:
        this.baseInfoComponent.submitForm();
        // 验证基础信息表单
        if(this.baseInfoComponent.validateForm.valid){
          // 获取基础信息表单
          this.addSourceInfo.baseInfo = cloneDeep(this.baseInfoComponent.validateForm.value) ;
          this.addStatueIndex++;
        }
        break;
      case 1:
        // 空间集合要素
        this.addSourceInfo.graphs = this.labelFeatureComponent.features;
        let {lng,lat} = this.signComponent.editMarker.getLngLat();
        this.addTag([lng,lat],this.addSourceInfo);

        break;

    }
    // 显示绘制工具
    this.toggleDrawTool(this.addStatueIndex);
  }

  beforeClick(): void {
    this.addStatueIndex -= 1;
    // show draw  Tool
    this.toggleDrawTool(this.addStatueIndex)
  }

  createAgain():void{
    // this.addStatueIndex =   0 ;
    this.signComponent.stopMarker();
    this.signComponent.tagDetailInfo = null;
  }
  viewDetail():void{
    this.signComponent.stopMarker();
    if(this.isEdit){
      this.showDetail.emit();
    }
    this.signComponent.toggleDetail(this.tagId);
  }
  addTag(geo:[number,number],source:soureTagInfo){
    let res = sourceTagToParams(geo,source);
    let funName:string = this.isEdit?"editTag":'addTag';
    let message = this.isEdit?"编辑":'新建';
    if(this.isEdit){
      res.tagid = this.tagId;
    }else{
      delete res.tagid;
    }
    this.signService[funName](res).subscribe((tagId:string)=>{
      if(tagId){
        this.tagId = tagId;
        this.addStatueIndex ++;
        this.addTagSuccess = true;
        this.cdr.markForCheck();
        this.mzMessageService.success( `${message}标记成功!`);
         this.signComponent.getTags(null);

      } else{
        this.addTagSuccess = false;
        this.mzMessageService.error(`${message}标记失败!`)
      }
    })
  }
  toggleDrawTool(statueIndex: number): void {
    if (statueIndex == 1) {
      this.editToolService.toggleTool(true)
    } else {
      this.editToolService.toggleTool(false)
    }
  }
  ngOnDestroy(): void {
    this.editToolService.toggleTool(false)
  }
}
