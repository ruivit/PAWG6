import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart/cart.service';
import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: any = [];
  term: string = '';
  quantity: number = 0;

  constructor(
    private restService: RestService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    console.log(this.term);
    this.restService.searchBooks(this.term).subscribe((data: {}) => {
      this.books = data;
      console.log(this.books);
    });
  }

  onSearch(term: string) {
    // only search if the term is at least 3 characters long
    if (term.length >= 3) {
      this.term = term;
      console.log(this.term);
      console.log(this.books);
      this.getBooks();
    } else if (term.length == 0) {
      this.getBooks();
    }
  }

  addToCart(book: any, quantity: number) {
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
