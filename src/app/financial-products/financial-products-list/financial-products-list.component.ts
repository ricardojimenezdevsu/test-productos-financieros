import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-products-list',
  imports: [],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.css',
})
export class FinancialProductsListComponent {
  constructor(private router: Router) {}

  onAddNewProduct() {
    this.router.navigate(['/products/add']);
  }
}
