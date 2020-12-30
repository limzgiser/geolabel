import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import BScroll from 'better-scroll';
@Component({
  selector: 'app-cf-scroll',
  template: `
    <div class="wrapper" #wrapscroll>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfScrollComponent implements OnInit, AfterViewInit {
  private bs: BScroll;
  @ViewChild('wrapscroll', { static: true }) private wrapRef: ElementRef;
  constructor(readonly el: ElementRef) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        fade: false,
        interactive: true,
      },
      click: true,
      mouseWheel: {},
    });
  }
}
