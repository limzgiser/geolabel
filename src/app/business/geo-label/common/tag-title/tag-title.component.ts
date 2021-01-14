import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lb-tag-title',
  templateUrl: './tag-title.component.html',
  styleUrls: ['./tag-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagTitleComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

}
