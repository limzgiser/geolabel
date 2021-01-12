import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-label-success',
  templateUrl: './label-success.component.html',
  styleUrls: ['./label-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelSuccessComponent implements OnInit {

  constructor() { }
  @Output() createAgainEmit = new EventEmitter<void>();
  @Output() viewDetailEmit = new EventEmitter<void>();
  ngOnInit() {
  }
  viewDetail():void{
  this.viewDetailEmit.emit();
  }
  createAgain():void{
    this.createAgainEmit.emit();
  }
}
