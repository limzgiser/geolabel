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
import {LabelBaseInfo, LabelgeoFeature} from "../../../types";

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
   options = [
    {
      value: '1',
      label: '道路',
      children: [
        {
          value: '11',
          label: '高速',
          children: [
            {
              value: '111',
              label: '钢型路面',
              isLeaf: true
            }
          ]
        },
        {
          value: '111',
          label: '国道',
          isLeaf: true
        }
      ]
    },
    {
      value: '1111',
      label: '铁路',
      children: [
        {
          value: '1111',
          label: '国道',
          children: [
            {
              value: '1111',
              label: '柔性路面',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
  nzOptions: NzCascaderOption[] =  this.options;
  constructor(private fb: FormBuilder,   private cdr: ChangeDetectorRef) {

  }
  ngOnInit() {

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  onChanges(value){

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

}
