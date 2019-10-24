import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';

import {MEAT_API} from '../app.api';

@Injectable()
export class OrderService {

	constructor(private cartService: ShoppingCartService, private http: Http) { }

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
		const headers: Headers = new Headers();
		headers.append("Content-Type", "application/json");

		return this.http
			.post(`${MEAT_API}/orders`, 
				JSON.stringify(order), 
				new RequestOptions({headers: headers}))
			.map(r => r.json());
	}

	clear(): void {
		this.cartService.clear();
	}

}