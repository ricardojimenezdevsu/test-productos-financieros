import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiFinancialProduct,
  ApiFinancialProductPage,
} from './financial-product/api-financial-product.model';
import { catchError, map, Observable, of } from 'rxjs';
import {
  toApiFinancialProduct,
  toFinancialProduct,
  toFinancialProducts,
} from './financial-product/financial-product.mapper';
import { FinancialProduct } from '../financial-products/financial-product.model';

@Injectable({
  providedIn: 'root',
})
export class BpService {
  private _baseUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) {}

  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.http.get<ApiFinancialProductPage>(`${this._baseUrl}`).pipe(
      map(({ data }) => toFinancialProducts(data)),
      catchError(() => of([]))
    );
  }

  createFinancialProduct(payload: FinancialProduct) {
    return this.http.post(`${this._baseUrl}`, toApiFinancialProduct(payload));
  }

  getFinancialProduct(id: string): Observable<FinancialProduct> {
    return this.http
      .get<ApiFinancialProduct>(`${this._baseUrl}/${id}`)
      .pipe(map((res) => toFinancialProduct(res)));
  }

  updateFinancialProduct(id: string, payload: FinancialProduct) {
    return this.http.put(
      `${this._baseUrl}/${id}`,
      toApiFinancialProduct(payload)
    );
  }

  deleteFinancialProduct(id: string) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

  validateFinancialProduct(id: string) {
    return this.http.get<boolean>(`${this._baseUrl}/verification/${id}`);
  }
}
