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
    book.quantityToBuy = 1;
    this.items.push(book);
  }

  getItemsInCart(): Book[] {
    return this.items;
  }

  clearCart() {
    this.items = Array<Book>();
  }

  canBuyBook(book: Book): boolean {
    let canBuy = true;
    this.items.forEach(item => {
      if (item._id === book._id) {
        // check the available stock
        if (item.stock < 1) {
          canBuy = false;
        } else if (item.stock < book.quantityToBuy) {
          console.log(item.stock, book.quantityToBuy);
          canBuy = false;
        }
      }
    });
    return canBuy;
  }

}
