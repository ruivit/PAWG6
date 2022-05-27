import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';
import { CartService } from './cart.service';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  booksInCart: Book[] = [];
  clientPoints: any;
  pointsTable: any = {};
  discountTable: any = {};

  constructor(
    private restService: RestService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.restService.getPointsTable().subscribe(data => {
      this.pointsTable = data;
    });
    this.restService.getDiscountTable().subscribe(data => {
      this.discountTable = data;
    }); 
    this.booksInCart = this.cartService.getBooksInCart();
    console.log("CART COMPONENT " + this.booksInCart);
  }

  // -------------- Cart Operations --------------
  removeFromCart(book: Book) {
    // ATUALIZAR PRECOS DO CARRINHO
    this.booksInCart.splice(this.booksInCart.indexOf(book), 1);
  }

  clearCart() {
    this.booksInCart = [];
    return this.booksInCart;
  }

  listBooks() {
    return this.booksInCart;
  }

  // -------------- Sale Operations --------------
  calculateTotalPrice(): number {
    console.log("CART COMPONENT CTP " + this.cartService.booksInCart);
    let total = 0;
    let ageDiscount = 0;
    let promotionDiscount = 0;
 
    // Add the book price to total
    for (let item of this.booksInCart) {
      total += item.sellPrice;
    }

    // Add the shipping cost to total
    total += this.calculateShipping();

    // Add the discount per age
    if (localStorage.getItem('ageType') == 'Infantil') {
      ageDiscount += total * this.discountTable.perInfantil;
    } else if (localStorage.getItem('ageType') == 'Juvenil') {
      ageDiscount += total * this.discountTable.perJuvenil;
    } else if (localStorage.getItem('ageType') == 'Adulto') {
      ageDiscount += total * this.discountTable.perAdulto;
    } else {
      ageDiscount += total * this.discountTable.perSenior;
    }

    // Check if there is a promotion active
    if (this.discountTable.activePromotion) {
      promotionDiscount += total * this.discountTable.discountPromotion;
    }
    
    total -= total * (ageDiscount + promotionDiscount);
    return total
  }

  calculateShipping(): number {
    let shipping = 0;
    
    if (this.booksInCart.length > 0) {
      // If the client has the points to get free shipping
      if (this.clientPoints >= this.pointsTable.shippingPoints) {
        shipping = 0;
      } else {
        // Calculate the shipping cost
        shipping = this.booksInCart.length * 0.85;
      }
      return shipping;
    } else {
      return 0;
    }
  }


  calculateGainedPoints(): number {
    let gainedPoints: number = 0;

    gainedPoints += (this.pointsTable.percentagePerPurschase
    * (this.booksInCart.length * 2));
    
    // If there is a promotion active, the client gains even more points
    if (this.pointsTable.salePromotionActive) {
      gainedPoints += this.pointsTable.pointsPerPromotion;
    }

    return gainedPoints;
  }
  

  makeSale(books: Book[]) {
    let quantity: number[] = [];
    for (let book of books) {
      quantity.push(book.quantityToBuy);
    }

    let sale: Sale = new Sale(
      "ruiv", books, quantity, this.calculateTotalPrice(),
      this.calculateGainedPoints(), new Date(), this.calculateShipping()
    );
    console.log(sale);
    confirm("Are you sure you want to make this sale?");
    // TODO - this.restService.updatePoints(client_id);
    // if shipping == 0 remove the 2k points
    this.restService.addSale(sale);
    this.router.navigate(['/']);
  }

}
