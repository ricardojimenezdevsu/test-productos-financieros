import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiFinancialProduct,
  ApiFinancialProductPage,
} from './financial-product/api-financial-product.model';
import { catchError, map, Observable, of } from 'rxjs';
import { toFinancialProducts } from './financial-product/financial-product.mapper';
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

  createFinancialProduct(payload: ApiFinancialProduct) {
    return this.http.post(`${this._baseUrl}`, payload);
  }

  getFinancialProduct(id: string) {
    return this.http.get(`${this._baseUrl}/${id}`);
  }

  updateFinancialProduct(id: string, payload: ApiFinancialProduct) {
    return this.http.put(`${this._baseUrl}/${id}`, payload);
  }

  deleteFinancialProduct(id: string) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

  validateFinancialProduct(id: string) {
    return this.http.get<boolean>(`${this._baseUrl}/verification/${id}`);
  }
}
