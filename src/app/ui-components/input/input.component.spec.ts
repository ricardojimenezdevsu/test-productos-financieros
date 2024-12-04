import { InputComponent } from './input.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: false,
})
class TestComponent {
  control = new FormControl('');
}
describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: SpectatorHost<InputComponent, TestComponent>;
  let host: TestComponent;
  const createHostComponent = createHostFactory({
    host: TestComponent,
    component: InputComponent,
    detectChanges: false,
    imports: [ReactiveFormsModule, InputComponent],
  });

  beforeEach(() => {
    fixture = createHostComponent(
      `<app-input [formControl]="control" type="text" label="test" placeholder="test" />`
    );
    component = fixture.component;
    host = fixture.hostComponent;
    fixture.detectChanges();
  });

  it('should have an initial value', () => {
    host.control.patchValue('test');
    fixture.detectChanges();
    expect(component.inputControl()).toEqual('test');
  });

  it('should mark input as disabled from parent control', () => {
    host.control.disable();
    fixture.detectChanges();
    expect(component.disabled()).toEqual(true);
  });

  it('should reflect changes to parent control', () => {
    fixture.typeInElement('test', 'input');
    fixture.detectChanges();
    expect(host.control.value).toEqual('test');
  });
});
