import { Injectable } from '@angular/core';

import { Book } from '../Models/Book';
import { Sale } from '../Models/Sale';
import { RestService } from '../rest/rest.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  books: Book[] = [];

  constructor(private rest: RestService) { }

  addToCart(book: Book) {
    this.books.push(book);
  }

  getBooksInCart() {
    return this.books;
  }

  clearCart() {
    this.books = [];
    return this.books;
  }
  
  removeItem(book: Book) {
    this.books.splice(this.books.indexOf(book), 1);
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
    for (let item of this.books) {
      total += item.sellPrice;
    }
    return total;
  }

  calculateShipping(): Number {
    let clientPoints: any = this.getClientPoints();
    let pointsData: any = this.getPointsData();
    let shipping = 0;

    if (!(clientPoints == pointsData.shippingPoints)) {
      return this.books.length * 0.85;
    }
    return shipping;
  }
  
  calculateGainedPoints(): Number {
    let clientPoints: any = this.getClientPoints();
    let pointsData: any = this.getPointsData();
    let gainedPoints = 0;
    return gainedPoints;
  }

  makeSale(books: Book[]) {
    let sale: Sale = new Sale(
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
