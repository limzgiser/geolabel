import { Injectable } from '@angular/core';
import { Feature } from '@turf/turf';
import { Subject } from 'rxjs';

@Injectable()
export class EditToolService {
  private subAdd = new Subject<Feature>();
  readonly addFeature$ = this.subAdd.asObservable();

  private subEdit = new Subject<Feature>();
  readonly editFeature$ = this.subEdit.asObservable();

  private subDelete = new Subject<Feature>();
  readonly deleteFeature$ = this.subDelete.asObservable();

  constructor() {}
  addFeature(feature: Feature) {
    this.subAdd.next(feature);
  }

  editFeature(feature: Feature) {
    this.subEdit.next(feature);
  }
  deleteFeature(feature: Feature): void {
    this.subDelete.next(feature);
  }
}
