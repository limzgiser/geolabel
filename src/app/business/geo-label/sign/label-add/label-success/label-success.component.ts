import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-success',
  templateUrl: './label-success.component.html',
  styleUrls: ['./label-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
