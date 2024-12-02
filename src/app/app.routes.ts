import { Routes } from '@angular/router';
import { FinancialRoutes } from './financial-products/financial-products.routes';

export const routes: Routes = [
    {
        path: "products",
        children: FinancialRoutes
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'products',
    },
];
