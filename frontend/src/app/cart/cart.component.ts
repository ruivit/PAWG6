import { Component, OnInit } from '@angular/core';

import { CartService } from './cart.service';
import { Book } from '../Models/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books = this.cartService.getBooksInCart();
  total = this.cartService.calculateTotal();
  shipping = this.cartService.calculateShipping();
  gainedPoints = this.cartService.calculateGainedPoints();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getTotal(): number {
    return this.cartService.calculateTotal();
  }

  removeFromCart(book: Book) {
    this.cartService.removeInCart(book);
  }

  makeSale(books: Book[]) {
    this.cartService.makeSale(books);
  }

}
