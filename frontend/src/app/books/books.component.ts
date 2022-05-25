import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';


import { CartService } from '../cart/cart.service';
import { Book } from '../Models/Book';

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
    private cartService: CartService) { }
  
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

  addToCart(book: Book, quantity: number) {
    // if the quantity is already at the maximum, alert the user
    
    // if the book is already in the cart, increment the quantity
    if (this.cartService.getBooksInCart().includes(book)) {
      book.quantityToBuy++;
    }
    // otherwise, add the book to the cart
    else {
      book.quantityToBuy = quantity;
      this.cartService.addToCart(book, quantity);
    }
  }

}