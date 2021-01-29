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


  treeId:string = '';
  treeNodes :classifyTreeNode[]= [];
  constructor(private  classifyService:ClassifyService,private  cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }
  searchNodeTree(rootNodeId:string):void{
  this.treeId = rootNodeId;
    this.classifyService.getClassifyTree({treeId:rootNodeId}).subscribe(result=>{
    
      let resNodes :classifyTreeNode[]=  JSON.parse(result.jsontree);
      if(resNodes.length<=0){
        return ;
      }
       resNodes[0].expanded = true;
      let each = function (node:classifyTreeNode){
        node.key = node.nodeid;
        node.isEdit = false;
        if(node.children && node.children.length>0){
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

  refreshTree(nodeId:string){
    this.searchNodeTree(nodeId);
  }
}
