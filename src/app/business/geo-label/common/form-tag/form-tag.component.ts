import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lb-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTagComponent),
      multi: true
    }
  ],
})
export class FormTagComponent implements   ControlValueAccessor {
  @Input() _tags: Array<string> = [];
  get tags() {
    return this._tags;
  }
  set tags(value: Array<string>) {
    this._tags = value;
    this.propagateChange(this._tags);
  }
  inputValue: string = '';
  inputVisible=false;
  validateForm!: FormGroup;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  constructor() { }

  ngOnInit(): void {

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

  propagateChange = (_: any) => { };

  writeValue(value: any) {
    if (value !== undefined) {
      this._tags = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }


}
