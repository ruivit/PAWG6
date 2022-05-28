import { Component, OnInit } from '@angular/core';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';
import { Router } from '@angular/router';

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
    let pointsTable = JSON.parse(localStorage.getItem('pointsTable') || '{}');

    console.log(discountTable.perInfantil);
    console.log(pointsTable.shippingPoints);
    // Ja se consegue fazer contas...
    this.total -= discountTable.perInfantil * 5;
    return this.total;
  }

  calculateGainedPoints() {
    return 100;
  }

  calculateShipping() {
    let pointsTable = JSON.parse(localStorage.getItem('pointsTable') || '{}');
    let shippingPoints = pointsTable.shippingPoints;
    
    return 5;
  }

  checkout() {
    this.snackBar.open('Checkout Successful', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.cartService.clearCart();

    let sale: any;
    sale = new Sale({
      clientUsername: JSON.parse(localStorage.getItem('username') || '{}'),
      books: this.books,
      total: this.calculateTotal(),
      gainedPoints: this.calculateGainedPoints(),
      date: new Date(),
      shipping: this.calculateShipping(),
    });

    let formParams = new FormData();

    // Iterate over all the sale values and add them to the object
    for (let key in sale) {
      formParams.append(key, sale[key]);
    }

    this.restService.checkout(formParams).subscribe(data => {
      console.log(data);
    });
    this.snackBar.open('Thanks for buying from us!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.router.navigate(['/client']);
  }
}
