import { ButtonComponent } from './button.component';
import { Component, signal } from '@angular/core';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

@Component({
  standalone: false,
})
class TestComponent {
  kind = signal('primary');
}
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: SpectatorHost<ButtonComponent, TestComponent>;
  let host: TestComponent;
  const createHostComponent = createHostFactory({
    host: TestComponent,
    component: ButtonComponent,
    detectChanges: false,
    imports: [ButtonComponent],
  });

  beforeEach(() => {
    fixture = createHostComponent(
      `<app-button label="test" [kind]="kind()" />`
    );
    component = fixture.component;
    host = fixture.hostComponent;
    fixture.detectChanges();
  });

  it('should display primary button', () => {
    expect(component.label()).toEqual('test');
    expect(component.kind()).toEqual('primary');
  });
});
