import { Injectable } from '@angular/core';
import { Feature } from '@turf/turf';
import { Subject } from 'rxjs';

@Injectable()
export class EditToolService {
  // 添加绘制要素
  private subAdd = new Subject<Feature>();
  readonly addFeature$ = this.subAdd.asObservable();

  // 编辑绘制要素
  private subEdit = new Subject<Feature>();
  readonly editFeature$ = this.subEdit.asObservable();

  //删除绘制要素
  private subDelete = new Subject<Feature>();
  readonly deleteFeature$ = this.subDelete.asObservable();

  // 回填绘制数据 to map
  private subAddToMap = new Subject<Array<Feature>>();
  readonly addToMap$ = this.subAddToMap.asObservable();

  // 回填绘制数据 to map
  private subToggleTool = new Subject<boolean>();
  readonly toggleTool$ = this.subToggleTool.asObservable();

  constructor() {

  }
  addFeature(feature: Feature): void  {
    this.subAdd.next(feature);
  }

  editFeature(feature: Feature): void  {
    this.subEdit.next(feature);
  }
  deleteFeature(feature: Feature): void {
    this.subDelete.next(feature);
  }
  addFeatureToMap(features:Array<Feature>):void{
    this.subAddToMap.next(features)
  }

  toggleTool(boolean):void{
    this.subToggleTool.next(boolean);
  }
}
