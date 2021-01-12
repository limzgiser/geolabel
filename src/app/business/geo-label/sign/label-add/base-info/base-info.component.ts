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

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BaseInfoComponent implements OnInit,OnChanges {

@Input() baseInfo = null;
  validateForm!: FormGroup;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
   options = [
    {
      value: '道路',
      label: '道路',
      children: [
        {
          value: '高速',
          label: '高速',
          children: [
            {
              value: '钢型路面',
              label: '钢型路面',
              isLeaf: true
            }
          ]
        },
        {
          value: '国道',
          label: '国道',
          isLeaf: true
        }
      ]
    },
    {
      value: '铁路',
      label: '铁路',
      children: [
        {
          value: '国道',
          label: '国道',
          children: [
            {
              value: '柔性路面',
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

    let {name,isPublic,classify,desInfo,tag} = this.baseInfo || {
      name:"",isPublic:"",classify:[],desInfo:"",tag:[]
    };
    this.validateForm = this.fb.group({
      name: [name,  [Validators.required]],
      isPublic: [isPublic, [Validators.required]],
      classify: [classify, [Validators.required ]],
      desInfo: [desInfo, [Validators.required]],
      tag:[ tag, [Validators.required]],
    });
  }

}
