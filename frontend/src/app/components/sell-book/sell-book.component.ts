import { Component, OnInit } from '@angular/core';
import { TempBook } from '../../Models/temp-book';
import { SellBookService } from 'src/app/services/sell-book/sell-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent {

  loading: boolean = false; // Flag variable

  // Inject SellBookService
  constructor(
    private sellBookService: SellBookService,
    private snackBar: MatSnackBar
  ) { }

  genres = ['Fiction', 'Non-Fiction', 'Children', 'Others', 'Biography', 'Poetry', 'Fantasy', 'Thriller', 'Horror', 'Mystery', 'Romance', 'Self-Help', 'Health', 'Travel', 'Science', 'History', 'Religion', 'Philosophy', 'Psychology', 'Business', 'Comics', 'Art', 'Cooking', 'Drama', 'Education', 'Engineering', 'Finance', 'Health', 'Law', 'Medicine', 'Music', 'Science', 'Sports', 'Technology', 'Travel', 'Youth'];
  genreHasError = true;

  // Create a model of an UsedBook

  tempBookModel = new TempBook('Title', 'Author', 'Genre', 'Editor', 'Resume', 
  0, new Date(Date.now()), '', localStorage.getItem('username') || '', 0);
  
  validateGenre(value:any){
    if(value === 'default'){
      this.genreHasError = true;
    } else {
      this.genreHasError = false;
    }
  }

  selectedFile: any;
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
  }
 

  onSubmit(){
    this.loading = true;
    this.sellBookService.onSubmit(this.tempBookModel, this.selectedFile);
    this.snackBar.open("Your proposal was submited.", '', { duration: 3000 });
  }

  
  ngOnInit(): void {
  }

}

