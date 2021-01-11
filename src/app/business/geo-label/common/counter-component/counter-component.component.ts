import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lb-counter-component',
  templateUrl: './counter-component.component.html',
  styleUrls: ['./counter-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponentComponent),
      multi: true
    }
  ],
})
export class CounterComponentComponent implements ControlValueAccessor  {

  constructor() { }
  @Input() _count: number = 0;

  get count() {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    this.propagateChange(this._count);
  }

  propagateChange = (_: any) => { };

  writeValue(value: any) {
    if (value !== undefined) {
      this.count = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
