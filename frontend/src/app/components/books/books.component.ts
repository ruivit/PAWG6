import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books = new Array<Book>();
  isLogged = false;
  type = "new";

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    console.log(this.type);
    this.restService.getBooks(this.type).subscribe(
      (data: Book[]) => {
        this.books = data;
      });
    if (localStorage.getItem('Token') != null) this.isLogged = true;
  }

  addToCart(book: Book) {
    if (book.quantityToBuy == 0) book.quantityToBuy = 1;
    if ( this.cartService.addToCart(book) ) {
      this.snackBar.open('Book added to cart', '', { duration: 2000 });
    } else {
      this.snackBar.open('Out of stock...', '', { duration: 5000 });
    }
  }
  
}
