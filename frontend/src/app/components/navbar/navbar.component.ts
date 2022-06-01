import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }

  getNewBooks() {
    this.router.navigateByUrl('/newbooks', { skipLocationChange: true });
  }

  getUsedBooks() {
    this.router.navigateByUrl('/usedbooks', { skipLocationChange: true });
  }
  
}
