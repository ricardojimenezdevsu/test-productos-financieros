import { Component, linkedSignal, resource, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../ui-components/input/input.component';
import { ButtonComponent } from '../../ui-components/button/button.component';
import { BpService } from '../../api/bp.service';
import { firstValueFrom } from 'rxjs';
import { DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FinancialProduct } from '../financial-product.model';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-financial-products-list',
  imports: [
    InputComponent,
    ButtonComponent,
    DatePipe,
    SlicePipe,
    FormsModule,
    CdkMenuModule,
  ],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.css',
})
export class FinancialProductsListComponent {
  pageSize = signal(5);
  products = linkedSignal(() =>
    this.productsResource.hasValue() ? this.productsResource.value()! : []
  );
  productsResource = resource({
    loader: async () => firstValueFrom(this.bpService.getFinancialProducts()),
    request: () => ({}),
  });

  searchTerm = signal('');

  constructor(private router: Router, private bpService: BpService) {}

  onAddNewProduct() {
    this.router.navigate(['/products/add']);
  }

  onSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    const filtered =
      this.productsResource
        .value()
        ?.filter(
          (item) =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
    this.products.update(() => [...filtered]);
  }

  onEditProduct(productId: string) {
    this.router.navigate(['/products/edit', productId]);
  }

  onDeleteProduct(product: FinancialProduct) {
    const confirmed = confirm(
      `¿Estas seguro de elminar el producto ${product.name}?`
    );
    if (confirmed) {
      this.bpService.deleteFinancialProduct(product.id).subscribe({
        next: () => {
          this.products.update((p) =>
            p.filter((prod) => prod.id !== product.id)
          );
        },
      });
    }
  }
}
