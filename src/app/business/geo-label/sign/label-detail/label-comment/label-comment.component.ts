import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lb-label-comment',
  templateUrl: './label-comment.component.html',
  styleUrls: ['./label-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelCommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
