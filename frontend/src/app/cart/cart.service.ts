import { Injectable } from '@angular/core';

import { Book } from '../Models/Book';
import { Sale } from '../Models/Sale';
import { RestService } from '../rest/rest.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Book[] = [];

  constructor(private rest: RestService) { }

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
  
  removeItem(book: Book) {
    this.items.splice(this.items.indexOf(book), 1);
  }

  // ----------- Points
  getClientPoints() {
    return this.rest.getClientPoints();
  }

  getPointsData() {
    return this.rest.getPointsData();
  }
    

  calculateTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.sellPrice;
    }
    return total;
  }

  calculateShipping(): Number {
    let clientPoints = this.getClientPoints();
    let pointsData = this.getPointsData();
    let shipping = 0;
    return shipping;
  }
  
  calculateGainedPoints(): Number {
    let clientPoints = this.getClientPoints();
    let pointsData = this.getPointsData();
    let gainedPoints = 0;
    return gainedPoints;
  }

  makeSale(books: Book[]) {
    let sale = new Sale(
      "client1",
      books,
      this.calculateTotal(),
      this.calculateGainedPoints(),
      new Date(),
      this.calculateShipping()
    );
    return this.rest.makeSale(sale);
  }
}
