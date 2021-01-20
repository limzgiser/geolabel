import {
  Component, OnInit, ViewEncapsulation,
  ChangeDetectionStrategy, ViewChild,
  ElementRef, AfterViewInit,
  Input, OnChanges, SimpleChanges, Output, EventEmitter, Inject
} from '@angular/core';
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

export class CfScrollComponent implements OnInit, AfterViewInit, OnChanges {
  private bs: BScroll;

  @ViewChild('wrapscroll', { static: true }) private wrapRef: ElementRef;

  @Output() pullEnd = new EventEmitter<any>();
  constructor(readonly el: ElementRef) { }
  @Input() finishPullUp = 0;
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        fade: false,
        interactive: true
      },
      click: true,
      mouseWheel: {},
      probeType: 3,
      pullUpLoad: true
    });
    this.bs.on('scroll', (position) => {
      // console.log(position)
    });
    this.bs.on('pullingUp', (position) => {

      this.pullEnd.emit(true);

    });
  }
  ngOnChanges(): void {
    if (this.finishPullUp) {
      this.bs.finishPullUp();
    }
  }

}
