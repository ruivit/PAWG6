import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsedBook } from '../Models/used-book';
import { SellBookService } from './sell-book.service';


@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent implements OnInit {

  constructor(
    private sellBookService: SellBookService
  ) { }

  genres = ['Fiction', 'Non-Fiction', 'Children', 'Others', 'Biography', 'Poetry', 'Fantasy', 'Thriller', 'Horror', 'Mystery', 'Romance', 'Self-Help', 'Health', 'Travel', 'Science', 'History', 'Religion', 'Philosophy', 'Psychology', 'Business', 'Comics', 'Art', 'Cooking', 'Drama', 'Education', 'Engineering', 'Finance', 'Health', 'Law', 'Medicine', 'Music', 'Science', 'Sports', 'Technology', 'Travel', 'Youth'];
  genreHasError = true;
  
  usedBookModel = new UsedBook('Title is required','','default','','');
  
  validateGenre(value:any){
    if(value === 'default'){
      this.genreHasError = true;
    } else {
      this.genreHasError = false;
    }
  }

  onSubmit(){
    this.sellBookService.onSubmit(this.usedBookModel);
  }

  
  ngOnInit(): void {
  }

}
