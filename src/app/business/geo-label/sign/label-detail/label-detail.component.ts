import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { soureTagInfo, tagDetailInfo } from '../../types';
import { SignService } from '../sign.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  tagDetailToSourceTagInfo,
  wktToGeoJson,
} from '../../utils/main-format';
import { SignComponent } from '../sign.component';
@Component({
  selector: 'lb-label-detail',
  templateUrl: './label-detail.component.html',
  styleUrls: ['./label-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelDetailComponent implements OnInit {
  @Input() data: tagDetailInfo = null;
  @Output() close = new EventEmitter<void>();

  @Input()  isEdit: boolean = false;
  @Input() addSourceInfo: soureTagInfo = null;
  constructor(
    private signService: SignService,
    private cdr: ChangeDetectorRef,
    private nzMessageService: NzMessageService,
    private signComponent: SignComponent
  ) {}
  ngOnInit(): void {}
  hide(): void {
    this.close.emit();
  }
  deleteTag(tagid: string): void {
    this.signService
      .deleteTag({ tagid: tagid })
      .subscribe((result: boolean) => {
        if (result) {
          this.cdr.markForCheck();
          this.nzMessageService.success('删除成功!');
          this.close.emit();
        } else {
          this.nzMessageService.error('删除失败!');
        }
      });
  }
  editTag() {
    this.isEdit = true;
    this.addSourceInfo = tagDetailToSourceTagInfo(this.data);
     let { coordinates } = wktToGeoJson(this.data.geom);
     this.signComponent.addMoveMarker(coordinates, false);
    // this.signComponent.addMarker();
  }
  showDetail(){
    this.isEdit = false;
  }
  ngOnChanges(): void {
    
  }
}
