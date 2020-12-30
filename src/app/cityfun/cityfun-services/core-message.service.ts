import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoreMessageService {
  private modeSearchMessageSource = new Subject<string>();
  nodemessage = this.modeSearchMessageSource.asObservable();
  messageAction(nodeinfo: any) {
    this.modeSearchMessageSource.next(nodeinfo);
  }
  constructor() { }

}
