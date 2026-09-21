import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';
import { AuthService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-eighth-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnDestroy {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _productsService = inject(ProductsService);

  private _products = signal<Product[]>([]);
  get products() {
    return this._products();
  }

  logout() {
    this._authService.logout();
    void this._router.navigate(['/eighth/login']);
  }

  loadProducts() {
    this._productsService.getAllProducts().subscribe((products) => {
      this._products.set(products);
    });
  }
  ngOnDestroy() {
    this._products.set([]);
  }
}
