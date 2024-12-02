import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent
  });
  let fixture: Spectator<AppComponent>
  beforeEach( () => {
    fixture = createComponent()
  });

  it('should create the app', () => {
    const app = fixture.component;
    expect(app).toBeTruthy();
  });

  it(`should have the 'test-productos-financieros' title`, () => {
    const app = fixture.component;
    expect(app.title).toEqual('test-productos-financieros');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, test-productos-financieros');
  });
});
