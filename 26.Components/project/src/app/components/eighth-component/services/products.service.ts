import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _httpCliente = inject(HttpClient);
  constructor() {}

  getAllProducts() {
    return this._httpCliente.get<Product[]>('/products');
  }
}
