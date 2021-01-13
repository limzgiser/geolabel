import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {ListLabelItem, SearchParams} from "../../types";
import {SignComponent} from "../sign.component";



@Component({
  selector: 'app-label-search',
  templateUrl: './label-search.component.html',
  styleUrls: ['./label-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LabelSearchComponent implements OnInit {
  @Input() tagList  = [];
  keyString:string = "";
  nowData :Date = new Date();
  dateRange :Array<Date>= [];
  isOpen: boolean = true;
  toggleFilter:boolean = true;
  dateFormat:string = 'yyyy/MM/dd';
  classifyValues = ['1','11','111'];

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
  @Output() search= new EventEmitter<any>();
  constructor(private  signComponent:SignComponent) {

  }
  ngOnInit() {}

  closeContainer(){
    this.isOpen = false;
  }
  clearParams():void{
    this.dateRange = [];
    this.classifyValues  = [];
    this.keyString =  '';
  }
 timeRangeOnChange(result: Array<string>): void {
    console.log('onChange: ', result);
  }
  doSearch():void{
    let searchParams:SearchParams =  {
      keyword:this.keyString,
      dataRage:this.dateRange,
      classifyValues:this.classifyValues
    }
    this.search.emit(searchParams)
  }
  classifyOnChanges($event){

  }
  hideFeature(Item:ListLabelItem){
   let ids = [];
   this.tagList.forEach(item=>{
     if(item.hidden){
       ids.push((item.id));
     }
   })

    this.signComponent.hideTagFeatures(ids);
  }
}
