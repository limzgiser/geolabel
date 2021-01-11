import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignBaseinfoService} from "../../services/sign-baseinfo.service";
@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BaseInfoComponent implements OnInit {
  value: string = '1234';
  radioValue: string = '私有';
  tags = ['储备用地', '宗地红线', '控规性规划'];
  inputVisible: boolean = false;
  inputValue: string = '';
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
  values: string[] | null = null;
  constructor(private fb: FormBuilder,private  signBaseinfoService:SignBaseinfoService) {
    this.validateForm = this.fb.group({
      name: ["标记名称", [ Validators.required,Validators.max(15)]],
      isPublic: ['私有', [Validators.required]],
      classify: [["道路", "国道"], [Validators.required  ]],
      desInfo: [null, [Validators.required]],
      tag:[ ['储备用地'], [Validators.required]],
    });
  }

  ngOnInit() {
    this.signBaseinfoService.nextStep$.subscribe(()=>{
      this.submitForm();
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.valid)
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  onChanges(values: string[]): void {
    console.log(values, this.values);
  }
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter((tag) => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
