import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, Inject } from '@angular/core';
import BScroll from 'better-scroll';
@Component({
  selector: 'app-cf-scroll',
  template: `
    <div class="cf-scroll" #wrapscroll>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`.cf-scroll{width: 100%; height: 100%; overflow: hidden;}`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CfScrollComponent implements OnInit, AfterViewInit {
  private bs: BScroll;
  @ViewChild('wrapscroll', { static: true }) private wrapRef: ElementRef;
  constructor(readonly el: ElementRef) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        fade: false,
        interactive: true
      },
      click: true,
      mouseWheel: {}
    });
  }
}
