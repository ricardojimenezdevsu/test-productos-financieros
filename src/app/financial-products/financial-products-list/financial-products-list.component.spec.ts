import { provideRouter } from '@angular/router';
import { FinancialProductsListComponent } from './financial-products-list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { routes } from '../../app.routes';

describe('FinancialProductsListComponent', () => {
  let component: FinancialProductsListComponent;
  let fixture: Spectator<FinancialProductsListComponent>;
  const createComponent = createComponentFactory({
    component: FinancialProductsListComponent,
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

  it('should display initial page', () => {
    expect(fixture.query('[qa-id="add-financial-product"]')).toBeTruthy();
    expect(fixture.query('[qa-id="search-financial-product"]')).toBeTruthy();
    expect(fixture.query('[qa-id="financial-products-list"]')).toBeTruthy();
  });

  it('should navigate to add new product when click on add button', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    fixture.click('[qa-id="add-financial-product"]');
    expect(navigateSpy).toHaveBeenCalledWith(['/products/add']);
  });
});
