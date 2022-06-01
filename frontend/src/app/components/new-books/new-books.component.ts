import { Component, OnInit } from '@angular/core';

import { Book } from '../../Models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css']
})
export class NewBooksComponent implements OnInit {

  books = new Array<Book>();
  isLogged = false;

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.restService.getBooks("new").subscribe(
      (data: Book[]) => {
        this.books = data;
        console.log(this.books);
      });
    if (localStorage.getItem('Token') != null) this.isLogged = true;
  }

  addToCart(book: Book) {
    if ( this.cartService.addToCart(book) ) {
      this.snackBar.open('Book added to cart', '', { duration: 2000 });
    } else {
      this.snackBar.open('Out of stock...', '', { duration: 5000 });
    }
  }

}
