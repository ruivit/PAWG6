import { Component, OnInit } from '@angular/core';

import { Book } from '../../Models/Book';
import { Sale } from '../../Models/Sale';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books = Array<Book>();
  total = 0;

  constructor(
    private cartService: CartService,
    private restService: RestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  ngOnInit(): void {

    
    this.books = this.cartService.getItemsInCart();

    // if the books are empty, send message and do nothing
    if (this.books.length === 0) { 
      this.snackBar.open('Your cart is empty', '', { duration: 5000 });
    return;
    }

    this.restService.getClientPoints().subscribe(data => {
      localStorage.setItem('clientPoints', JSON.stringify(data));
    });
    this.restService.getPointsTable().subscribe(data => {
      localStorage.setItem('pointsTable', JSON.stringify(data));
    });
    
    this.restService.getDiscountTable().subscribe(data => {
      localStorage.setItem('discountTable', JSON.stringify(data));
    });

    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.books.forEach(book => {
      this.total += book.sellPrice;
    });

    let discountTable = JSON.parse(localStorage.getItem('discountTable') || '{}');

    let ageType = localStorage.getItem('ageType');
    let discountAge = 0;
    switch (ageType) {
      case 'Infantil': {
        discountAge = discountTable.perInfantil;
        break;
      }
      case 'Juvenil': {
        discountAge = discountTable.perJuvenil;
        break;
      }
      case 'Adulto': {
        discountAge = discountTable.perAdulto;
        break;
      }
      case 'Senior': {
        discountAge = discountTable.perSenior;
        break;
      }
    }

    let promotionDiscount = 0;
    if (discountTable.activePromotion) {
      promotionDiscount = discountTable.discountPromotion;
    }

    this.total -= promotionDiscount;
    this.total -= this.calculateShipping();
    this.total -= discountAge;
    return this.total;
  }

  calculateGainedPoints() {
    let pointsTable = JSON.parse(localStorage.getItem('pointsTable') || '{}');

    let clientTotalBuys: any;
    clientTotalBuys = localStorage.getItem('totalBuys');
  // If this is the first buy the clientTotalBuys will be null so we set it to 1
    if (clientTotalBuys === '0') {
      clientTotalBuys = 1;
    }

    let gainedPoints = 0;
    // percentage of points for each sale calculated by the formula: total * pointsTable.percentagePerPurchase
    let percentagePoints = this.calculateTotal() * pointsTable.percentagePerPurschase;
    console.log("Tabela de Pontos" + pointsTable);

    // Points if the promotion is active
    let promotionPoints = 0;

    if (pointsTable.salePromotionActive) {
      promotionPoints = pointsTable.pointsPerSalePromotion;
    }
    // Points per total of books in the totalBuys calculated by the formula: totalBuys * pointsTable.buyedBooks
    let buyedBooksPoints = clientTotalBuys * pointsTable.buyedBooks;
    gainedPoints = percentagePoints + promotionPoints + buyedBooksPoints;

    gainedPoints = Math.ceil(gainedPoints);
    return gainedPoints;
  }

  calculateShipping() {
    let pointsTable = JSON.parse(localStorage.getItem('pointsTable') || '{}');
    let shippingPoints = pointsTable.shippingPoints;
    let clientPoints = JSON.parse(localStorage.getItem('clientPoints') || '{}');

    if (clientPoints.shippingPoints >= shippingPoints) {
      return 0;
    } else {
      return this.books.length * 0.85;
    }
  }

  checkout() {
    this.snackBar.open('Checkout Successful', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.cartService.clearCart();

    let sale: any;
    sale = new Sale({
      clientUsername: localStorage.getItem('username') || '',
      books: JSON.stringify(this.books),
      booksInfo: Array<any>(),
      total: this.calculateTotal(),
      gainedPoints: this.calculateGainedPoints(),
      date: new Date(),
      dateString: new Date().toLocaleDateString(),
      shipping: this.calculateShipping(),
    });

    let formParams = new FormData();
    // Iterate over all the sale values and add them to the object
    for (let key in sale) {
      formParams.append(key, sale[key]);
    }

    this.restService.checkout(formParams).subscribe(
      (data: any) => {
        this.snackBar.open(data.msg, '', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['/client']);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Ups');
        } else {
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 2000,
          });
        }
      }
    );
  }
}
