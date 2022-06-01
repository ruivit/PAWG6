import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BooksService } from 'src/app/services/books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = this.userService.isLoggedIn();
  new = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private bookService: BooksService,
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }

  getUsedBooks() {
    this.bookService.searchType = "used";
    this.router.navigateByUrl('/client', { skipLocationChange: true });
  }
  
}
