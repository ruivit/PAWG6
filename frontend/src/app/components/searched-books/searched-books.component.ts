import { Component, OnInit } from '@angular/core';

import { Book } from '../../Models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-searched-books',
  templateUrl: './searched-books.component.html',
  styleUrls: ['./searched-books.component.css']
})
export class SearchedBooksComponent implements OnInit {

  books: any = [];
  term: string = '';
  bookType: string = '';
  quantity: number = 0;
  isLogged = false;

  constructor(
    private restService: RestService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('Token') != null) this.isLogged = true;
    this.getBooks();
  }

  getBooks() {
    if (this.bookType == '') { this.bookType = "new" }
    this.restService.searchBooks(this.term, this.bookType).subscribe((data: {}) => {
      this.books = data;
    });
  }

  setSearchType(bookType: string) {
    this.bookType = bookType;
  }

  onSearch(term: string) {
    // only search if the term is at least 3 characters long
    if (term.length >= 3) {
      this.term = term;
      this.getBooks();
    } else if (term.length == 0) {
      this.getBooks();
    }
  }


  addToCart(book: Book) {
    if (this.cartService.addToCart(book)) {
      this.snackBar.open('Book added to cart', '', { duration: 2000 });
    } else {
      this.snackBar.open('Out of stock...', '', { duration: 5000 });
    }
  }

}
