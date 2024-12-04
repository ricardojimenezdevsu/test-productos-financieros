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
import { fakeAsync, flush, tick } from '@angular/core/testing';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: Spectator<FinancialProductFormComponent>;
  const productAlreadyExists$ = new BehaviorSubject<boolean>(false);
  const productDetail$ = new BehaviorSubject<FinancialProduct | undefined>(
    undefined
  );
  const params = { productId: '' };
  const createComponent = createComponentFactory({
    component: FinancialProductFormComponent,
    providers: [
      provideRouter(routes),
      mockProvider(ActivatedRoute, { params: of(params) }),
      mockProvider(BpService, {
        validateFinancialProduct: jest
          .fn()
          .mockImplementation(() => of(productAlreadyExists$.value)),
        getFinancialProduct: jest
          .fn()
          .mockImplementation(() => of(productDetail$.value)),
        updateFinancialProduct: jest.fn().mockReturnValue(of({})),
      }),
    ],
    detectChanges: false,
  });
  beforeEach(() => {
    fixture = createComponent();
    component = fixture.component;
    productAlreadyExists$.next(false);
    productDetail$.next(undefined);
    params['productId'] = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products list when click on close button', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    fixture.detectChanges();
    fixture.click('[qa-id="close-btn"]');
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should resets form value', () => {
    fixture.detectChanges();
    component.productForm.patchValue({
      id: 'test',
    });
    expect(component.productForm.controls.id.value).toEqual('test');
    fixture.click('[qa-id="cancel-btn"]');
    fixture.detectChanges();
    expect(component.productForm.controls.id.value).toEqual('');
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

  it('should update revision date when new release date is selected', () => {
    fixture.detectChanges();
    component.productForm.patchValue({
      releaseDate: '2024-12-04',
    });
    expect(component.productForm.controls.revisionDate.value).toEqual(
      '2025-12-04'
    );
  });

  it('should update product', fakeAsync(() => {
    params['productId'] = 'test';
    productDetail$.next({
      name: 'product test',
      id: 'test',
      description: 'testing product',
      releaseDate: new Date(),
      revisionDate: new Date(),
      logo: 'required',
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.productForm.getRawValue()).toEqual(
      expect.objectContaining({
        id: 'test',
        description: 'testing product',
        name: 'product test',
      })
    );
    component.productForm.controls.description.patchValue(
      'this is a new description'
    );

    const updateSpy = jest.spyOn(
      component['bpService'],
      'updateFinancialProduct'
    );
    fixture.click('[qa-id="submit-btn"] button');
    fixture.detectChanges();
    expect(updateSpy).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        id: 'test',
        description: 'this is a new description',
        name: 'product test',
      })
    );
    flush();
  }));
});
