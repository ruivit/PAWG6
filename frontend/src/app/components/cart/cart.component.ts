import { Component, OnInit } from '@angular/core';

import { Book } from '../../models/Book';
import { DiscountTable } from '../../models/DiscountTable';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books = Array<Book>();
  total = 0;
  clientPoints = 0;

  constructor(
    private cartService: CartService,
    private restService: RestService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.books = this.cartService.getItemsInCart();

    /*this.restService.getClientPoints().subscribe(data => {
      this.clientPoints = data;
    });*/
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
  }

  checkout() {
    this.snackBar.open('Checkout Successful', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.cartService.clearCart();
  }
}
