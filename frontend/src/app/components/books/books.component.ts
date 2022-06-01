import { Component, OnInit } from '@angular/core';

import { Book } from '../../Models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books = new Array<Book>();
  isLogged = false;

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private restService: RestService,
    private bookService: BooksService
  ) { }

  ngOnInit(): void {
    console.log(this.bookService.searchType);
    this.restService.getBooks(this.bookService.searchType).subscribe(
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
