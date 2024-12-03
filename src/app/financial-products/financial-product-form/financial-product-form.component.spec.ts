import { FinancialProductFormComponent } from './financial-product-form.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { BehaviorSubject, of } from 'rxjs';
import { BpService } from '../../api/bp.service';
import { FinancialProduct } from '../financial-product.model';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: Spectator<FinancialProductFormComponent>;
  const productAlreadyExists$ = new BehaviorSubject<boolean>(false);
  const productDetail$ = new BehaviorSubject<FinancialProduct | undefined>(
    undefined
  );
  const createComponent = createComponentFactory({
    component: FinancialProductFormComponent,
    providers: [
      provideRouter(routes),
      { provide: ActivatedRoute, useValue: { params: of({}) } },
      mockProvider(BpService, {
        validateFinancialProduct: jest
          .fn()
          .mockImplementation(() => of(productAlreadyExists$.value)),
        getFinancialProduct: jest
          .fn()
          .mockImplementation(() => of(productDetail$.value)),
      }),
    ],
    detectChanges: false,
  });
  beforeEach(() => {
    fixture = createComponent();
    component = fixture.component;
    productAlreadyExists$.next(false);
    productDetail$.next(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products list when click on cancel button', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    fixture.detectChanges();
    fixture.click('[qa-id="cancel-btn"]');
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should validate if product id exists', () => {
    component.productForm.controls.id.patchValue('test');
    fixture.detectChanges();

    expect(component.productForm.controls.id.valid).toEqual(true);
    productAlreadyExists$.next(true);

    component.productForm.controls.id.patchValue('test2');
    fixture.detectChanges();
    expect(component.productForm.controls.id.valid).toEqual(false);
  });
});
