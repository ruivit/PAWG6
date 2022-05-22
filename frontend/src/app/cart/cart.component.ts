import { Component, OnInit } from '@angular/core';


import { CartService } from './cart.service';
import { Book } from '../Models/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();
  total = this.cartService.calculateTotal();
  shipping = this.cartService.calculateShipping();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getTotal(): number {
    return this.cartService.calculateTotal();
  }

  removeFromCart(item: Book) {
    this.cartService.removeItem(item);
  }

  makeSale(item: Book[]) {
    this.cartService.makeSale(item);
  }
}
