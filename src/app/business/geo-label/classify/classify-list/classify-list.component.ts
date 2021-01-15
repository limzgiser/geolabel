import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lb-classify-list',
  templateUrl: './classify-list.component.html',
  styleUrls: ['./classify-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassifyListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
