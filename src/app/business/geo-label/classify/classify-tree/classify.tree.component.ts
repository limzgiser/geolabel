import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent} from "ng-zorro-antd";

@Component({
  selector: 'lb-classify-tree',
  templateUrl: './classify.tree.component.html',
  styleUrls: ['./classify.tree.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ClassifyTreeComponent implements OnInit {

  constructor() { }
  searchValue = '';
  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  loadInitLayers(e){

  }
  selectLayers(e){

  }
  removeKeys(e){

  }
  treeDestroy(e){

  }
  ngOnInit(): void {
  }

}
