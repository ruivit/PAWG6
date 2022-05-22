import { Component, OnInit } from '@angular/core';

import { Book } from '../Models/Book';
import { RestService } from '../rest/rest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: any = [];
  term = "";

  constructor(
    private rest: RestService
  ) { }

  ngOnInit(): void {
  }

  getBooks() {
    console.log(this.term);
    this.rest.searchBooks(this.term).subscribe((data: {}) => {
      this.books = data;
      console.log(this.books);
    });
  }
}
