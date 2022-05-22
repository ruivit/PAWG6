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

  removeInCart(book: Book) {
    this.books = this.books.filter(b => b._id !== book._id);
  }

  getBooksInCart() {
    return this.books;
  }

  clearCart() {
    this.books = [];
    return this.books;
  }

  


  calculateTotal() {
    let total = 0;
    for (let item of this.books) {
      total += item.sellPrice;
    }
    return total;
  }

  calculateShipping(): Number {
    let clientPoints: any = this.rest.getClientPoints();
    let pointsData: any = this.rest.getPointsData();
    let shipping = 0;

    if (!(clientPoints == pointsData.shippingPoints)) {
      return this.books.length * 0.85;
    }
    return shipping;
  }

  calculateGainedPoints(): Number {
    let pointsData: any = this.rest.getPointsData();
    let gainedPoints = 0;

    gainedPoints += this.calculateTotal() * pointsData.percentagePerPurschase;
    
    // If there is a promotion active, the client gains even more points
    if (pointsData.salePromotionActive) {
      gainedPoints += pointsData.pointsPerPromotion;
    }

    return gainedPoints;
  }

  makeSale(books: Book[]) {
    let sale: Sale = new Sale(
      "client1", books, this.calculateTotal(),
      this.calculateGainedPoints(), new Date(), this.calculateShipping()
    );
    this.rest.addSale(sale);
  }

}
