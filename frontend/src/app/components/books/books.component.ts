import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart/cart.service';
import { Book } from '../../models/Book';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  
  books: Book[] = [];
  quantity: number = 0;

  constructor(public rest: RestService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.getBooks();
  }
  
  getBooks() {
    this.books = [];
    this.rest.index().subscribe((data: {}) => {
      this.books = data as Book[];
    });
  }

  getBookStock(book: Book) {
    return book.stock;
  }

  findInCart(book: Book) {
    return this.cartService.getBooksInCart().includes(book);
  }

  getQuantity(book: Book) {
    return book.quantityToBuy;
  }

  addToCart(book: Book) {
    // if the quantity is already at the maximum, alert the user
    this.snackBar.open('Book added to cart', '', {
      duration: 1000,
    });

    // if the book is already in the cart, increment the quantity
    if (this.cartService.getBooksInCart().includes(book)) {
      book.quantityToBuy++;
      this.snackBar.open('Added one more book', '', {
        duration: 1000,
      });
    }
    // otherwise, add the book to the cart
    else {
      book.quantityToBuy += 1;
      console.log("book component " + book.title);
      this.cartService.addToCart(book, 1);
      this.snackBar.open('Book added to cart', '', {
        duration: 1000,
      });
    }
  }

}