import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type ApiFinancialProduct = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BpService {
  private _baseUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getFinancialProducts() {
    return this.http.get(`${this._baseUrl}`)
  }

  createFinancialProduct( payload: ApiFinancialProduct) {
    return this.http.post(`${this._baseUrl}`,payload)
  }

  updateFinancialProduct(id: string, payload: ApiFinancialProduct) {
    return this.http.patch(`${this._baseUrl}/${id}`,payload)
  }

  deleteFinancialProduct(id: string) {
    return this.http.delete(`${this._baseUrl}/${id}`)
  }
}
