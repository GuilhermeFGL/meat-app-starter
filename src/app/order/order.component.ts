import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';

import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from '../order/order.service';
import {Order, OrderItem} from './order.model';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
  	{label: 'Dinheiro', value: 'money'},
  	{label: 'Cartão de Débito', value: 'deb'},
  	{label: 'Cartão Refeição', value: 'ref'},
  ];

  constructor(private orderService: OrderService,
        private router: Router,
        private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fromBuilder.group({
       name: this.fromBuilder.control('', [Validators.required, Validators.minLength(5)]),
       email: this.fromBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
       emailConfirmation: this.fromBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
       address: this.fromBuilder.control('', [Validators.required, Validators.minLength(5)]),
       number: this.fromBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
       optionalAddress: this.fromBuilder.control(''),
       paymentOption: this.fromBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    
    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }

    return undefined;
  }

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

  checkOrder(order: Order): void {
    order.orderItems = this.cartItems()
      .map((i:CartItem) => new OrderItem(i.quantity, i.menuItem.id));
     
     this.orderService.checkOrder(order).subscribe((orderId: Order) => {
         this.orderService.clear();
         this.router.navigate(['/order-sumary']);
       });

     console.log(order);
  }

}
