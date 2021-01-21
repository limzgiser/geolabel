import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzTreeNode} from "ng-zorro-antd";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'lb-tree-content',
  templateUrl: './tree-content.component.html',
  styleUrls: ['./tree-content.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TreeContentComponent implements OnInit {

  @Input() nodes = [];
  searchValue = null;
  @Output() initSelectKeys = new EventEmitter<Array<string>>(); // 默认选中节点
  @Output() selectKeys = new EventEmitter<Array<string>>(); //   选中keys
  @Output() removeKeys = new EventEmitter<Array<string>>(); //   取消选中keys
  @Output() treeDestroy = new EventEmitter<Array<string>>();
  @Output() editNodeEvent = new EventEmitter<any>();
  @Output() deleteNodeEvent = new EventEmitter<any>();
  @Output() addNodeEvent = new EventEmitter<any>();
  totalLayer: number = 0;
  defaultCheckedKeys = [];  // 默认选中的key -- 内容回更改
  defaultCheckedKeysBack = [];  // 默认选中的key 备份-- 内容不会更改
  editNode = null;
  addNode = null;
  hoverNode = null;


  updateNodeNameValue:string = '';

  constructor(private nzContextMenuService: NzContextMenuService,
              private cdr:ChangeDetectorRef,
              private nzMessageService: NzMessageService,) { }
  ngOnInit() {

  }
  checkChange(e) {
    if (e.node.isLeaf) {
      this.leafNodeInteraction(e.node);
    } else {
      this.nonleafNodeInteraction(e.node);
    }
  }
  // 叶子节点控制
  leafNodeInteraction(node) {
    let {key} = node;
    if (node.isChecked) {
      /// 加载图层
      // 选中图层
      this.selectKeys.emit( [key,[node.key]]);
    } else {
      // 移除图层
      // ('remove', node.key)
      this.removeKeys.emit( [key,[node.key]]);
    }
  }
  delete(node,e):void{
    this.deleteNodeEvent.emit(node.key )
    e.stopPropagation();
    e.preventDefault();
  }
  add(node,e):void{
    this.editNode  = null;
    node._isExpanded = true;
    let key =   new Date().getTime();
    this.updateNodeNameValue ='新建节点';
     let addTmpnode =   {
       key :key,
       count:0,
       isLeaf:true,
       nodeid:key,
       sn:0,
       title:  this.updateNodeNameValue,
       isEdit:true,
     }
     if(node._children && node._children.length==0){
       node.origin.isLeaf= false;
        node.isLeaf = false;
        node._isLeaf = false;
     }
     node.addChildren([
         addTmpnode
       ]);
     this.addNode = addTmpnode;

    e.stopPropagation();
    e.preventDefault();
  }
  edit(node,e):void{

   this.editNode = node;
   this.updateNodeNameValue = node.origin.title;
    // this.editNode.emit(node);
    e.stopPropagation();
    e.preventDefault();
  }
  mouseover(node){
    this.hoverNode = node;
  }
  inputClick(e){
    e.stopPropagation();
    e.preventDefault();
  }
  mouseleave(){
    // this.selecNode = null;
    this.hoverNode  = null;
    this.editNode = null;
    this.addNode = null;
  }

  editOnKey(node,e:KeyboardEvent){
    if(e.keyCode ==13){
      node._title = this.updateNodeNameValue;
      this.editNode = null;
      this.editNodeEvent.emit({
        key:node.key,
        value:this.updateNodeNameValue
      })
    }
  }
  addOnKey(node,e:KeyboardEvent){
    if(e.keyCode ==13){
      node._title = this.updateNodeNameValue;
      this.addNode = null;
      this.addNodeEvent.emit(
        {
          "parentId":node.parentNode.key,
          "nodeName": node._title,
          "preNodeId": ""
        }
      )
    }
  }
  // 非叶子节点控制
  // 要向下递归查询所有叶子节点
  nonleafNodeInteraction(node) {
    let {key} = node;
    const childsKes = this.getAllChilds(node, 0);
    if (node.isChecked) {
      //  选中图层
      this.selectKeys.emit([key,childsKes]);
    } else {
      // 移除图层
      this.removeKeys.emit([key,childsKes]);
    }
  }
  /**
   *   查询所有子节点key,
   *   tag : 只能传入 0(所有子节点keys) 或 1(选中的子节点keys) 或 2(未选中的所有子节点keys) ;
   */
  private getAllChilds(node, tag: 0 | 1 | 2) {
    const result = [];
    // tslint:disable-next-line:no-shadowed-variable
    const findChilds = (node) => {
      if (node.isLeaf) {
        if (tag === 0) {
          result.push(node.key);
        }
        if (tag === 1 && (node.checked || node.isChecked)) {
          result.push(node.key);
        }
        if (tag === 2 && !node.checked && !node.isChecked) {
          result.push(node.key);
        }
      } else {
        if (node.children) {
          node.children.forEach(cnode => {
            findChilds(cnode);
          });
        }
      }
    };
    if (Array.isArray(node)) {
      node.forEach(item => {
        findChilds(item);
      });
    } else {
      findChilds(node);
    }

    return result;
  }
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    this.editNode = this.addNode = null;
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }
  searchValueChange(nodes) {
    let func = function forNodes(node, key) {
      if (node.key === key) {
        node.searched = true;
      } else {
        node.searched = false;
      }
      if (node.children) {
        for (let item of node.children) {
          func(item, key);
        }
      }
    };
    if (nodes && nodes.keys) {
      nodes.keys.forEach(key => {
        if (this.nodes instanceof Array) {
          this.nodes.forEach(tmpnode => {
            func(tmpnode, key);
          });
        }
      });
    }
  }

  clearAllSelected() {
    const leafNodes = this.getAllChilds(this.nodes, 1);
    const tmpdefaultCheckedKeys = [];
    leafNodes.forEach(item => {
      this.defaultCheckedKeysBack.forEach(jtem => {
        if (item === jtem) {
          tmpdefaultCheckedKeys.push(item);
        }
      });
    });
    this.defaultCheckedKeys = [...tmpdefaultCheckedKeys];
    const removeNodes:any = leafNodes.filter(i => {
      return this.defaultCheckedKeys.indexOf(i) === -1;
    });

    this.removeKeys.emit(['',removeNodes]);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const defaultsNodesKey: Array<string> = this.getAllChilds(this.nodes, 1);
    this.totalLayer = (this.getAllChilds(this.nodes, 0) || []).length;
    this.defaultCheckedKeys = defaultsNodesKey;
    this.defaultCheckedKeysBack = defaultsNodesKey;
    this.initSelectKeys.emit(defaultsNodesKey);
  }
  ngOnDestroy(): void {
    const allSelectNodes = this.getAllChilds(this.nodes, 1);
    const filterNodes = allSelectNodes.filter(item => {
      return this.defaultCheckedKeys.indexOf(item) === -1;
    });
    this.treeDestroy.emit(filterNodes);

  }

}
