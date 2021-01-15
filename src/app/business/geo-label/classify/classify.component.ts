import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'lb-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ClassifyComponent implements OnInit {

  constructor() { }
  aaa = true;
  ngOnInit(): void {
  }
  test(){
    this.aaa=!this.aaa;
  }
}
