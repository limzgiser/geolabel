import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ClassifyService} from "../classify.service";
import {classifyRootItem} from "../../types";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {EditClassifyComponent} from "../edit-classify/edit-classify.component";
import { cloneDeep } from 'lodash';
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'lb-classify-list',
  templateUrl: './classify-list.component.html',
  styleUrls: ['./classify-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassifyListComponent implements OnInit {

  constructor(private classifyService:ClassifyService,
              private  cdr:ChangeDetectorRef,
              private modal: NzModalService,
              private  nzMessageService:NzMessageService
  ) { }
  nodeList :classifyRootItem[] = [];
  selectIitem:classifyRootItem = null;

  ngOnInit(): void {
  this.getRootClassifyList();
  }
  itemClick(item:classifyRootItem):void{
   this.selectIitem = item;
  }

  getRootClassifyList(){
    this.classifyService.getRootClassifyList(null).subscribe(res=>{
      this.nodeList = res;
      if(this.nodeList.length){
        this.selectIitem = res[0];
      }
      this.cdr.markForCheck();
    })
  }
  createModal(){
    this.modal.create({
      nzTitle: '编辑分类',
      nzContent: EditClassifyComponent,
      nzClosable: true,
      nzWidth:700,
      nzComponentParams:{nodeList: cloneDeep(this.nodeList) },
      nzOnOk: (editClassifyComponent) => new Promise(resolve =>{
        let {nodeList} = editClassifyComponent;
        let params = this.getEditParams(nodeList,this.nodeList);
        this.classifyService.updateRootClassifyList(params).subscribe(result=>{
          this.nzMessageService.success( '更新成功!');
          this.getRootClassifyList();
          resolve();
        });

      })
    });
  }
  getEditParams(oldValue:classifyRootItem[] ,newValue:classifyRootItem[] ){
    let addOptions:string = '';
     addOptions  =  oldValue.filter(item=>item.isAdd) .map(item=>item.name).toString();
     let deleteOptions:string = '';
    deleteOptions =   oldValue.filter(item=>item.isDelete).map(item=>item.treeid).toString();
    let editOption = [];
    oldValue.forEach(item=>{
      let fitem :classifyRootItem= newValue.find(jtem=>jtem.treeid ===item.treeid);
      if(fitem && fitem.name!=item.name){
          editOption.push({
            treeid:fitem.treeid,
            name:fitem.name
          })
      }
    });
    return {
      addOption:addOptions,
      deleteOption:deleteOptions,
      editOption:editOption
    }
  }


}
