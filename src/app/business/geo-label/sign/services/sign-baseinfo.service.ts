import { Injectable } from '@angular/core';
import { Feature } from '@turf/turf';
import { Subject } from 'rxjs';

@Injectable()
export class SignBaseinfoService {
  private sub = new Subject<Feature>();
  readonly nextStep$ = this.sub.asObservable();


  constructor() {

  }
  nexStep() {
    this.sub.next();
  }


}
