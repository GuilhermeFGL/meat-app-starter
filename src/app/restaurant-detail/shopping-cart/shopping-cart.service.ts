import {Injectable} from '@angular/core';

import {CartItem} from './cart-item.model';
import {MenuItem} from '../menu-item/menu-item.model';

import {NotificationService} from '../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {

	itens: CartItem[] = [];

	constructor(private notificationService: NotificationService) { }

	addItem(item: MenuItem): void {
		let foundItem = this.itens.find((i) => i.menuItem.id === item.id);

		if (foundItem) {
			this.increaseQty(foundItem);
		} else {
			this.itens.push(new CartItem(item));
		}

		this.notificationService.notify(`Você adicionou o ítem ${item.name}`);
	}

	remove(item: CartItem): void {
		this.itens.splice(this.itens.indexOf(item), 1);
		this.notificationService.notify(`Você removeu o ítem ${item.menuItem.name}`);
	}

	clear(): void {
		this.itens = [];
	}

	total(): number {
		return this.itens
			.map(i => i.value()).
			reduce((i, j) => i + j, 0);
	}

	increaseQty(item: CartItem): void {
		item.quantity += 1;
	}

	decreaseQty(item: CartItem): void {
		item.quantity -= 1;
		if (item.quantity === 0) {
			this.remove(item);
		}
	}
}