import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductFormComponent } from './financial-product-form.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: Spectator<FinancialProductFormComponent>;
  const createComponent = createComponentFactory({
    component: FinancialProductFormComponent,
    providers: [provideRouter(routes)],
  });
  beforeEach(() => {
    fixture = createComponent();
    component = fixture.component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
