import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BaseInfoComponent implements OnInit {
  value: string = '1234';
  radioValue: string = '私有';
  tags = ['储备用地', '宗地红线', '控规性规划'];
  inputVisible: boolean = false;
  inputValue: string = '';

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  constructor() {}

  ngOnInit() {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter((tag) => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
