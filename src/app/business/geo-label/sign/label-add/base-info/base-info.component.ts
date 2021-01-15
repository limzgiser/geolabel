import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {classifyTree, LabelBaseInfo, LabelgeoFeature} from "../../../types";
import {SignService} from "../../sign.service";

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BaseInfoComponent implements OnInit,OnChanges {
defaultValue:LabelBaseInfo = { "title": '',"ispublic":  '1', "taginfos": [], "desc": '',categoryid:[]};
@Input() baseInfo:LabelBaseInfo = null;
  validateForm!: FormGroup;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  classifyTree = [];
  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private  signService:SignService
  ) {

  }
  ngOnInit() {

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  classifyNgModelChange(value){

  }

  ngOnChanges(changes: SimpleChanges): void {

    const {title,ispublic,taginfos,desc,categoryid} = this.baseInfo ||  this.defaultValue;
    this.validateForm = this.fb.group({
      title: [title,  [Validators.required]],
      ispublic: [ ispublic, [Validators.required]],
      categoryid: [categoryid, [Validators.required ]],
      desc: [desc, [Validators.required]],
      taginfos:[ taginfos , [Validators.required]],
    });
  }
  getClassifyTree():void{
    this.signService.getClassifyTree({treeid:'875ee2e3-e994-96ae-7def-9cb3e9f2593e'}).subscribe(
      (result:[])=>{
        // let {jsontree} = result;
        // let json = JSON.parse(jsontree);
        // this.classifyTree = json;
      })
  }
}
