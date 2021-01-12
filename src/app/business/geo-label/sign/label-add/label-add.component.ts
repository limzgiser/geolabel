import {ChangeDetectorRef, EventEmitter, Input, Optional, Output, ViewChild} from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {BaseInfoComponent} from "./base-info/base-info.component";
import {LabelFeatureComponent} from "./label-feature/label-feature.component";
import {LabelBaseInfo} from "../../types";
import { cloneDeep } from 'lodash';

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
  addSourceInfo  = {
    baseInfo:null,
    geoms:[],
  };
  constructor( ) {}
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
           // console.log(this.baseInfoComponent.validateForm.value);
           this.addStatueIndex++;
         }
         break;
       case 1:
         // 空间集合要素
         // console.log(this.labelFeatureComponent.features);
         this.addSourceInfo.geoms = this.labelFeatureComponent.features;
         this.addStatueIndex ++;
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
   toggleDrawTool(statueIndex: number): void {
    if (statueIndex == 1) {
      this.showEditToolEvent.emit(true);
    } else {
      this.showEditToolEvent.emit(false);
    }
  }
}
