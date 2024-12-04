import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
let id = 0;
@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  placeholder = input('');
  label = input('');
  type = input.required<string>();

  inputControl = signal('');
  inputId = signal('');
  disabled = signal(false);

  constructor() {
    this.inputId.set(`bp-input-${id++}`);
  }

  onChange = (_value: string) => {};

  onTouched = () => {};

  onValueChanged(newValue: string) {
    this.inputControl.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value?: string): void {
    this.inputControl.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
