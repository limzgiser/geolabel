import {ChangeDetectorRef, EventEmitter, Input, Optional, Output, ViewChild} from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {BaseInfoComponent} from "./base-info/base-info.component";
import {LabelFeatureComponent} from "./label-feature/label-feature.component";
import {LabelBaseInfo, soureTagInfo} from "../../types";
import { cloneDeep } from 'lodash';
import {SignComponent} from "../sign.component";
import {SignService} from "../sign.service";
import {sourceTagToParams} from "../../utils/main-format";


@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LabelAddComponent implements OnInit {
  addStatueIndex: number = 0;
  isOpen: boolean = true;
  @Output() showEditToolEvent = new EventEmitter<boolean>();
  @ViewChild('baseInfoComponent', { static: false }) private baseInfoComponent: BaseInfoComponent;
  @ViewChild('labelFeatureComponent',{static:false}) private  labelFeatureComponent:LabelFeatureComponent;

  addServeInfo:LabelBaseInfo =   null;
  addSourceInfo :soureTagInfo = {
    baseInfo: null,
    graphs: [],
  };
  constructor(private  signComponent:SignComponent,private  signService:SignService) {}
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
  closeContainer():void {
    this.isOpen = false;
  }
  beforeClick(): void {
    this.addStatueIndex -= 1;
    // show draw  Tool
    this.toggleDrawTool(this.addStatueIndex)
  }

  createAgain():void{
    this.addStatueIndex =   0 ;
  }
  viewDetail():void{

  }
  addTag(geo:[number,number],source:soureTagInfo){
  let res =    sourceTagToParams(geo,source);
    this.signService.addTag(res).subscribe((success:boolean)=>{
      if(success){
        this.addStatueIndex ++;
      }
    })
  }
   toggleDrawTool(statueIndex: number): void {
    if (statueIndex == 1) {
      this.showEditToolEvent.emit(true);
    } else {
      this.showEditToolEvent.emit(false);
    }
  }
}
