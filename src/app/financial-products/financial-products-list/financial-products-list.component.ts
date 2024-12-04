import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../ui-components/input/input.component';
import { ButtonComponent } from '../../ui-components/button/button.component';

@Component({
  selector: 'app-financial-products-list',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.css',
})
export class FinancialProductsListComponent {
  constructor(private router: Router) {}

  onAddNewProduct() {
    this.router.navigate(['/products/add']);
  }
}
