import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-label-container',
  templateUrl: './label-container.component.html',
  styleUrls: ['./label-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({
          opacity: 0,
          height: 0,
        }),
        animate(
          '.2s',
          style({
            opacity: 1,
            height: '*',
          })
        ),
      ]),
      transition(':leave', [
        style({
          overflow: 'hidden',
        }),
        animate(
          '.2s',
          style({
            opacity: 0,
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class LabelContainerComponent implements OnInit {
  @Input() closeble: boolean = true;
  @Input() toggleble: boolean = true;
  @Input() title: string = '标记查询';
  @Output() closed = new EventEmitter<void>();
  showPanel:boolean = true;
  constructor() {}

  ngOnInit() {}
  togglePanel(show: boolean): void {
    if (show) {
      this.showPanel = true;
    } else {
      this.showPanel = false;
    }
  }
  close() {
    this.closed .emit();
  }
}
