import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassifyService} from "./classify.service";
import {classifyRootItem, classifyTreeNode} from "../types";

@Component({
  selector: 'lb-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ClassifyComponent implements OnInit {

  treeNodes :classifyTreeNode[]= [];
  constructor(private  classifyService:ClassifyService,private  cdr:ChangeDetectorRef) { }

  ngOnInit(): void {

  }
  searchNodeTree(rootNode:classifyRootItem):void{
    this.classifyService.getClassifyTree({treeId:rootNode.treeid}).subscribe(result=>{
      let resNodes :[]=  JSON.parse(result.jsontree);
      let each = function (node:classifyTreeNode){
        node.key = node.nodeid;
        node.isEdit = false;
        if(node.children){
          node.children.forEach((node:classifyTreeNode)=>{
               each(node);
          })
        }
      }
      resNodes.forEach(node=>{
        each(node);
      });
      this.treeNodes = resNodes;
      this.cdr.markForCheck();
    })
  }
}
