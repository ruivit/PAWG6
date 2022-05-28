import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BooksComponent } from '../books/books.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = this.userService.isLoggedIn();

  constructor(
    private userService: UserService,
    private router: Router,
    private booksComponent: BooksComponent
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }

  getUsedBooks() {
    this.booksComponent.type = 'used';
    this.booksComponent.ngOnInit();
    this.ngOnInit();
  }
}
