import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {ListLabelItem, SearchParams, searchTagResult,tagListItem} from "../../types";
import {SignComponent} from "../sign.component";
import {wktToGeoJson} from "../../utils/main-format";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-label-search',
  templateUrl: './label-search.component.html',
  styleUrls: ['./label-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:[DatePipe]
})
export class LabelSearchComponent implements OnInit {
  @Input() tagList:Array<tagListItem> =  [];
  keyString:string = "";
  nowData :Date = new Date();
  dateRange :Array<Date>= [];
  isOpen: boolean = true;
  toggleFilter:boolean = true;
  dateFormat:string = 'yyyy/MM/dd';
  classifyValues = [ ];
  pageSize :number = 10;
  pageNumber:number = 1;
  @Input() defaultSearchParams = null;
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
  constructor(private  signComponent:SignComponent,private  datePipe:DatePipe) {

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
   let defaultSearchParams:SearchParams = {
      keyWord:this.keyString,
      categoryId: this.classifyValues.pop() ||'',
      startTime: this.dateRange  &&  this.datePipe.transform(this.dateRange[0],'yyyy-MM-dd HH:mm:ss') ||'',
      endTime:this.dateRange  &&  this.datePipe.transform(this.dateRange[1],'yyyy-MM-dd HH:mm:ss')  ||'',
      pageSize: this.pageSize,
      pageNo: this.pageNumber,
    }
    this.search.emit(defaultSearchParams)
  }
  classifyOnChanges($event){

  }
  hideFeature(item:ListLabelItem){
   let ids = [];
   this.tagList.forEach(item=>{
     if(item.hidden){
       ids.push((item.tagid));
     }
   })
    this.signComponent.hideTagFeatures(ids);
  }
  centerToFeature(item:tagListItem){
     let {coordinates} = wktToGeoJson(item.geom);
     console.log(coordinates);
     this.signComponent.mapboxMap.flyTo({
         center:coordinates,
         zoom:15
     })
  }
}
