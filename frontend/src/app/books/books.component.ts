import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../Models/Book';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-book',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: any = [];

  constructor(public rest: RestService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cartService: CartService) { }
  
  ngOnInit() {
    this.getBooks();
  }
  
  getBooks() {
    this.books = [];
    this.rest.getBooks().subscribe((data: {}) => {
      this.books = data;
    });
  }

  addToCart(book: Book) {
    // if the book is already in the cart, increment the quantity
    if (this.cartService.items.find(x => x._id === book._id)) {
      // if the quantity is already at the maximum, alert the user
      if (this.cartService.items.find(x => x._id === book._id).stock === book.stock) {
        window.alert('Your product has been added to the cart! + ' + book.title);
      } else { 
        this.cartService.items.find(x => x._id === book.stock++);
      }
    } else {     
      this.cartService.addToCart(book);
    }
    window.alert('Your product has been added to the cart! + ' + book.title);
  }
}