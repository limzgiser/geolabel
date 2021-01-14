import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BaseInfoComponent} from "../base-info/base-info.component";
import {LabelFeatureComponent} from "../label-feature/label-feature.component";
import {LabelBaseInfo, soureTagInfo} from "../../../types";
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
export class AddContentComponent implements OnInit {

  addStatueIndex: number = 0;

  addTagSuccess:boolean = true;
  @Output() showEditToolEvent = new EventEmitter<boolean>();
  @ViewChild('baseInfoComponent', { static: false }) private baseInfoComponent: BaseInfoComponent;
  @ViewChild('labelFeatureComponent',{static:false}) private  labelFeatureComponent:LabelFeatureComponent;

  addServeInfo:LabelBaseInfo =   null;
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
  }
  viewDetail():void{

  }
  addTag(geo:[number,number],source:soureTagInfo){
    let res = sourceTagToParams(geo,source);
    this.signService.addTag(res).subscribe((success:boolean)=>{
      console.log(success)
      if(success){
        this.addStatueIndex ++;
        this.addTagSuccess = true;
        this.cdr.markForCheck();
        this.mzMessageService.success('新建标记成功!')
      } else{
        this.addTagSuccess = false;
        this.mzMessageService.error('新建标记失败!')
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
}
