import { CoreMessageService } from './../cityfun-services/core-message.service';


import {
  Component, OnInit, ChangeDetectionStrategy,
  Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy
} from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent, } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

@Component({
  selector: 'app-cf-tree',
  templateUrl: './cf-tree.component.html',
  styleUrls: ['./cf-tree.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CfTreeComponent implements OnInit, OnChanges, OnDestroy {
  activedNode: NzTreeNode;
  @Input() nodes = [];
  searchValue = null;
  @Output() initSelectKeys = new EventEmitter<Array<string>>(); // 默认选中节点
  @Output() selectKeys = new EventEmitter<Array<string>>(); //   选中keys
  @Output() removeKeys = new EventEmitter<Array<string>>(); //   取消选中keys
  @Output() treeDestroy = new EventEmitter<Array<string>>();

  totalLayer: number = 0;
  defaultCheckedKeys = [];  // 默认选中的key -- 内容回更改
  defaultCheckedKeysBack = [];  // 默认选中的key 备份-- 内容不会更改
  constructor(private nzContextMenuService: NzContextMenuService, private coreMessageService: CoreMessageService) { }
  ngOnInit() {

    // (this.getAllChilds(this.nodes, 1));
    // let defaultsNodesKey = this.getAllChilds(this.nodes,1)
    // this.showDefaultLayers()
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
    if (node.isChecked) {
      /// 加载图层
      // 选中图层
      this.selectKeys.emit([node.key]);
    } else {
      // 移除图层
      // ('remove', node.key)
      this.removeKeys.emit([node.key]);
    }
  }
  // 非叶子节点控制
  // 要向下递归查询所有叶子节点
  nonleafNodeInteraction(node) {

    const childsKes = this.getAllChilds(node, 0);
    if (node.isChecked) {

      //  选中图层
      this.selectKeys.emit(childsKes);
    } else {
      // 移除图层
      this.removeKeys.emit(childsKes);
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
  activeNode(data: NzFormatEmitEvent): void {
    // this.activedNode = data.node!;
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
    const removeNodes = leafNodes.filter(i => {
      return this.defaultCheckedKeys.indexOf(i) === -1;
    });

    this.removeKeys.emit(removeNodes);
  }
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
  selectDropdown(): void {
    // (123);
  }
  treeSearch(node) {
    // this.nodeSearch.emit(node);
    this.coreMessageService.messageAction(node.origin);
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
    // console
    // .log(this.getAllChilds(this.nodes[0],0,))
  }

}
