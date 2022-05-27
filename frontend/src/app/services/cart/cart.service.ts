import { Injectable } from '@angular/core';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = Array<Book>();

  constructor() { }

  addToCart(book: Book) {
    this.items.push(book);
  }

  getItemsInCart(): Book[] {
    return this.items;
  }

  clearCart() {
    this.items = Array<Book>();
  }
}
