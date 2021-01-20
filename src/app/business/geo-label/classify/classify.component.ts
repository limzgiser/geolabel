import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassifyService} from "./classify.service";

@Component({
  selector: 'lb-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ClassifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
