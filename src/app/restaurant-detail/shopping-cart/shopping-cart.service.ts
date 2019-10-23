import {CartItem} from './cart-item.model';
import {MenuItem} from '../menu-item/menu-item.model';

export class ShoppingCartService {

	itens: CartItem[] = [];

	addItem(item: MenuItem): void {
		let foundItem = this.itens.find((i) => i.menuItem.id === item.id);

		if (foundItem) {
			this.increaseQty(foundItem);
		} else {
			this.itens.push(new CartItem(item));
		}
	}

	remove(item: CartItem): void {
		this.itens.splice(this.itens.indexOf(item), 1);
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