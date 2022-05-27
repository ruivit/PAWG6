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

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private restService: RestService
  ) { }


  ngOnInit(): void {
    this.restService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
      });
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
    this.snackBar.open('Book added to cart', '', { duration: 2000 });
  }
  
}
