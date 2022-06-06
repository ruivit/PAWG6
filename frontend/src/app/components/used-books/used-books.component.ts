import { Component, Inject, OnInit } from '@angular/core';

import { Book } from '../../Models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { CartService } from 'src/app/services/cart/cart.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-used-books',
  templateUrl: './used-books.component.html',
  styleUrls: ['./used-books.component.css']
})
export class UsedBooksComponent implements OnInit {

  books = new Array<Book>();
  isLogged = false;

  selectedBook?: Book;
  dataSource = new MatTableDataSource(this.books);
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private restService: RestService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.restService.getBooks("used").subscribe(
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

  openDialog(book: Book) {
    this.dialog.open(BookDetailComponent, {
      data: {
        title: book.title,
        author: book.author,
        editor: book.editor,
        genre: book.genre,
        resume: book.resume,
        avaliation: book.avaliation,
        isbn: book.isbn,
        stock: book.stock,
      },
    });
  }
}
