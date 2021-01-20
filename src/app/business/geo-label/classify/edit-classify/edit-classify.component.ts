import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {classifyRootItem} from "../../types";

@Component({
  selector: 'lb-edit-classify',
  templateUrl: './edit-classify.component.html',
  styleUrls: ['./edit-classify.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class EditClassifyComponent implements OnInit {

  constructor() { }
  @Input() nodeList:classifyRootItem[] = [];
  selectItemNode :classifyRootItem = null;

  ngOnInit(): void {}
  itemClick(nodeItem:classifyRootItem):void{
    this.selectItemNode = nodeItem;
  }
  deleteItem(item:classifyRootItem):void{
       item.isDelete = true;
  }
  addItem():void{
    let item = {  name:'',tacount:0,treeid:'0',isAdd:true, }
     this.nodeList .push(item);
  }
}
