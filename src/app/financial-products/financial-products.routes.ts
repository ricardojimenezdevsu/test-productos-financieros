import { Route } from '@angular/router';

export const FinancialRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        './financial-products-list/financial-products-list.component'
      ).then((c) => c.FinancialProductsListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./financial-product-form/financial-product-form.component').then(
        (c) => c.FinancialProductFormComponent
      ),
  },
  {
    path: 'edit/:productId',
    loadComponent: () =>
      import('./financial-product-form/financial-product-form.component').then(
        (c) => c.FinancialProductFormComponent
      ),
  },
];
