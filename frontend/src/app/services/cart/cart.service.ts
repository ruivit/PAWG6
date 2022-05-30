import { Injectable } from '@angular/core';

import { Book } from '../../models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BLOCK_MARKER } from '@angular/localize/src/utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = Array<Book>();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  addToCart(book: Book): boolean {
    // count the number of the same book already in the cart
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == book._id) {
        count++;
      }
    }

    if (book.stock > 0) {
      // compare the book.stock with the count
      if (count < book.stock) {
        this.items.push(book);
        return true;          
      } else {
        return false;
      }
    }
    return true;
  }

  getItemsInCart(): Book[] {
    return this.items;
  }

  clearCart() {
    this.items = Array<Book>();
  }

}
