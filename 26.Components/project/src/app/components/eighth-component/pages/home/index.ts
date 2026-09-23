import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from '../../models/Product';
import { AuthService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-eighth-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _productsService = inject(ProductsService);

  private _isLoading = signal(false);
  get isLoading() {
    return this._isLoading();
  }

  private _products = signal<Product[]>([]);
  get products() {
    return this._products();
  }

  logout() {
    this._authService.logout();
    void this._router.navigate(['/eighth/login']);
  }

  loadProducts() {
    this._isLoading.set(true);
    this._productsService
      .getAllProducts()
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe((products) => {
        this._products.set(products);
      });
  }
  ngOnDestroy() {
    this._products.set([]);
  }
}
