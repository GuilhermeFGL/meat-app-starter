import { Component, OnInit } from '@angular/core';

import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from '../order/order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
  	{label: 'Dinheiro', value: 'money'},
  	{label: 'Cartão de Débito', value: 'deb'},
  	{label: 'Cartão Refeição', value: 'ref'},
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit() { }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
  	return this.orderService.cartItems();
  }

  increaseQty(item: CartItem): void {
  	this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem): void {
  	this.orderService.decreaseQty(item);
  }

  remove(item: CartItem): void {
  	this.orderService.remove(item);
  }

}
