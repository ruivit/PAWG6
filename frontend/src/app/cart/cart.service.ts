import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  booksInCart: Book[] = [];

  constructor() { }

  addToCart(book: Book, quantity: number) {
    this.booksInCart.push(book);
    this.booksInCart[this.booksInCart.length - 1].quantityToBuy = quantity;
  }

  removeInCart(book: Book) {
    this.booksInCart.splice(this.booksInCart.indexOf(book), 1);
  }

  getBooksInCart() {
    return this.booksInCart;
  }
  
}
