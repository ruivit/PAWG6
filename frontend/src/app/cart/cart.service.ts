import { Injectable } from '@angular/core';

import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Book[] = [];

  constructor() { }

  addToCart(book: Book) {
    this.items.push(book);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  
  calculateTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.sellPrice;
    }
    return total;
  }

  removeItem(book: Book) {
    this.items.splice(this.items.indexOf(book), 1);
  }

}
