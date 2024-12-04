import { provideRouter } from '@angular/router';
import { FinancialProductsListComponent } from './financial-products-list.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { routes } from '../../app.routes';
import { BpService } from '../../api/bp.service';
import { of } from 'rxjs';
import { fakeAsync, flush, tick } from '@angular/core/testing';

const MOCK_PRODUCTS = Array.from({ length: 30 }).map((_, i) => ({
  name: 'product ' + i,
  id: i + '',
  description: 'test product ' + i,
  releaseDate: new Date(),
  revisionDate: new Date(),
  logo: '',
}));
describe('FinancialProductsListComponent', () => {
  let component: FinancialProductsListComponent;
  let fixture: Spectator<FinancialProductsListComponent>;
  const createComponent = createComponentFactory({
    component: FinancialProductsListComponent,
    providers: [
      provideRouter(routes),
      mockProvider(BpService, {
        getFinancialProducts: jest
          .fn()
          .mockImplementation(() => of(MOCK_PRODUCTS)),
      }),
    ],
  });

  beforeEach(() => {
    fixture = createComponent();
    component = fixture.component;
    fixture.detectChanges();
  });

  it('should display initial page', fakeAsync(() => {
    expect(fixture.query('[qa-id="add-financial-product"]')).toBeTruthy();
    expect(fixture.query('[qa-id="search-financial-product"]')).toBeTruthy();
    tick(); // loads initial resources
    const table = fixture.query('[qa-id="financial-products-list"]');
    fixture.detectChanges();
    expect(table).toBeTruthy();
    expect(table?.querySelectorAll('tbody tr').length).toEqual(5);
    flush();
  }));

  it('should navigate to add new product when click on add button', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    fixture.click('[qa-id="add-financial-product"]');
    expect(navigateSpy).toHaveBeenCalledWith(['/products/add']);
  });

  it('should update page size and see the corresponding rows', () => {
    const table = fixture.query('[qa-id="financial-products-list"]');
    const pageSizeInput = fixture.query('#page-size') as HTMLSelectElement;
    fixture.detectChanges();
    expect(table).toBeTruthy();
    expect(pageSizeInput).toBeTruthy();
    expect(pageSizeInput.value).toEqual('5');
    expect(table?.querySelectorAll('tbody tr').length).toEqual(5);

    pageSizeInput.value = '20';
    pageSizeInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(table?.querySelectorAll('tbody tr').length).toEqual(20);
  });

  it('should filter rows', () => {
    component.pageSize.set(20);
    fixture.detectChanges();
    const searchInput = fixture.query(
      '[qa-id="search-financial-product"] input'
    ) as HTMLInputElement;
    fixture.typeInElement('product 2', searchInput);
    fixture.detectChanges();
    const table = fixture.query('[qa-id="financial-products-list"]');
    expect(table?.querySelectorAll('tbody tr').length).toEqual(11);
  });
});
