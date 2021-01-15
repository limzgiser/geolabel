import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {tagListItem, SearchParams, searchTagResult, classifyTree} from "../../types";
import {SignComponent} from "../sign.component";
import {wktToGeoJson} from "../../utils/main-format";
import { DatePipe } from '@angular/common';
import {CfhttpService} from "../../../../services/cfhttp.service";
import {SignService} from "../sign.service";


@Component({
  selector: 'app-label-search',
  templateUrl: './label-search.component.html',
  styleUrls: ['./label-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:[DatePipe]
})
export class LabelSearchComponent implements OnInit {
  @Input() tagList:searchTagResult =  null;
  keyString:string = "";
  nowData :Date = new Date();
  dateRange :Array<Date>= [];
  isOpen: boolean = true;
  toggleFilter:boolean = true;
  dateFormat:string = 'yyyy/MM/dd';
  classifyValues = [ ];
  pageSize :number = 9;
  pageNumber:number = 1;
  @Input() defaultSearchParams =  {
    keyWord:'',
    categoryId: '',
    startTime:   '',
    endTime: '',
    pageSize: this.pageSize,
    pageNo: this.pageNumber
  };
 classifyTree= [ ]

  @Output() search= new EventEmitter<any>();
  constructor(private  signComponent:SignComponent,
              private  datePipe:DatePipe,
              private  signService:SignService,
              private  cdr:ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.getClassifyTree();
  }

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
      startTime: this.dateRange  &&
        this.datePipe.transform(this.dateRange[0],'yyyy-MM-dd HH:mm:ss') ||'',
      endTime:this.dateRange  &&
        this.datePipe.transform(this.dateRange[1],'yyyy-MM-dd HH:mm:ss')  ||'',
      pageSize: this.pageSize,
      pageNo: this.pageNumber,
    }
    this.search.emit(defaultSearchParams)
  }
  classifyOnChanges($event){

  }
  hideFeature(item:tagListItem){
   let ids = [];
   this.tagList.list.forEach(item=>{
     if(item.hidden){
       ids.push((item.tagid));
     }
   })
    this.signComponent.hideTagFeatures(ids);
  }
  tagItemClick(item:tagListItem):void{
     let {coordinates} = wktToGeoJson(item.geom);
     this.signComponent.mapboxMap.flyTo({
         center:coordinates,
         zoom:15
     });
     this.signComponent.toggleDetail(item.tagid);
  }
  pageItemClick(pageIndex:number):void{
    this.pageNumber = pageIndex;
    this.doSearch();
  }
  toggleSub(data:tagListItem):void{
  this.signComponent.toggleSub(data);
  }

  getClassifyTree():void{
     this.signService.getClassifyTree({treeid:'875ee2e3-e994-96ae-7def-9cb3e9f2593e'}).subscribe(
       (result:[])=>{
       // let json = JSON.parse(result);
       // console.log(json);
       // this.classifyTree = json;
     })
  }
}
