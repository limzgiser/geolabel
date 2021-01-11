import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {SignBaseinfoService} from "../services/sign-baseinfo.service";

@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LabelAddComponent implements OnInit {
  addStatueIndex: number = 0;
  isOpen: boolean = true;
  value: string = '1234';
  radioValue: string = '私有';
  @Output() showEditToolEvent = new EventEmitter<boolean>();
  constructor(private  signBaseinfoService:SignBaseinfoService) {}

  ngOnInit() {}
  closePancel(e) {
    this.isOpen = false;
  }

  nextClick(): void {
    this.signBaseinfoService.nexStep();
    // this.addStatueIndex += 1;
    // this.toggleDrawTool(this.addStatueIndex);
    // this.signBaseinfoService.nexStep();

  }
  beforeClick(): void {
    this.addStatueIndex -= 1;
    // show draw  Tool
    this.toggleDrawTool(this.addStatueIndex);

  }
   toggleDrawTool(statueIndex: number): void {
    if (statueIndex == 1) {
      this.showEditToolEvent.emit(true);
    } else {
      this.showEditToolEvent.emit(false);
    }
  }
}
