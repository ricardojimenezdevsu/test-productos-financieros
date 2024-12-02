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
});
