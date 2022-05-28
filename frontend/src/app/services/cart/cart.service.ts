import { Injectable } from '@angular/core';

import { Book } from '../../models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = Array<Book>();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  addToCart(book: Book): boolean {
    // if book already in cart, increase quantity
    let bookInCart = this.items.find(b => b._id === book._id);
    if (bookInCart) {
      // if there is stock, increase quantity
      if (bookInCart.stock > bookInCart.quantityToBuy) {
        bookInCart.quantityToBuy++;
      } else {
        return false;
      }
    } else {
      this.items.push(book);
    }
    console.log(this.items);
    return true;
  }

  getItemsInCart(): Book[] {
    return this.items;
  }

  clearCart() {
    this.items = Array<Book>();
  }

}
