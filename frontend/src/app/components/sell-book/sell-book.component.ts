import { Component, OnInit } from '@angular/core';

import { UsedBook } from 'src/app/models/UsedBook';
import { SellBookService } from 'src/app/services/sell-book/sell-book.service';

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent implements OnInit {

  loading: boolean = false; // Flag variable

  // Inject SellBookService
  constructor(private sellBookService: SellBookService) { }

  genres = ['Fiction', 'Non-Fiction', 'Children', 'Others', 'Biography', 'Poetry', 'Fantasy', 'Thriller', 'Horror', 'Mystery', 'Romance', 'Self-Help', 'Health', 'Travel', 'Science', 'History', 'Religion', 'Philosophy', 'Psychology', 'Business', 'Comics', 'Art', 'Cooking', 'Drama', 'Education', 'Engineering', 'Finance', 'Health', 'Law', 'Medicine', 'Music', 'Science', 'Sports', 'Technology', 'Travel', 'Youth'];
  genreHasError = true;
  
  validateGenre(value:any){
    if(value === 'default'){
      this.genreHasError = true;
    } else {
      this.genreHasError = false;
    }
  }

  // Create a model of an UsedBook
  tempBookModel: UsedBook = {
    _id: 0,
    title: '',
    author: '',
    genre: '',
    editor: '',
    resume: '',
    avaliation: 0,
    isbn: 1234567891234,
    date: new Date(),
    condition: '',
    provider: '',
    quantityToBuy: 0,
    stock: 0,
    sellPrice: 0,
    buyPrice: 0,
}


  selectedFile: any;

  onFileChanged(event: any) {
    console.log(event.target.files[0], "onfilechanged");
    this.selectedFile = event.target.files[0]
  }
 

  onSubmit(){
    this.loading = true;
    this.sellBookService.onSubmit(this.tempBookModel, this.selectedFile);
  }

  
  ngOnInit(): void {
  }

}

