import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  kind = input<'primary' | 'secondary'>('secondary');
  type = input<'button' | 'submit'>('button');
  aspect = input<'solid' | 'basic'>('solid');
}
