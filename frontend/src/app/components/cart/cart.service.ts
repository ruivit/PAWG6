import { Injectable } from '@angular/core';
import { Book } from '../../models/Book';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  booksInCart: Book[] = [];

  constructor() { }

  addToCart(book: Book, quantity: number) {
    this.booksInCart.push(book);
    this.booksInCart[this.booksInCart.length - 1].quantityToBuy = quantity;
    console.log("cart service add to cart " + this.booksInCart);
  }

  getBooksInCart() {
    console.log("cart service get books in cart " + this.booksInCart);
    return this.booksInCart;
  }
  
}
