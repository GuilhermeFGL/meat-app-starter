import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';

import {MEAT_API} from '../app.api';

@Injectable()
export class OrderService {

	constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

	cartItems(): CartItem[] {
		return this.cartService.itens;
	}

	increaseQty(item: CartItem): void {
		this.cartService.increaseQty(item);
	}

	decreaseQty(item: CartItem): void {
		this.cartService.decreaseQty(item);
	}

	remove(item: CartItem): void {
		this.cartService.remove(item);
	}

	itemsValue(): number {
		return this.cartService.total();
	}

	checkOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(`${MEAT_API}/orders`, order);
	}

	clear(): void {
		this.cartService.clear();
	}

}