import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private User: UserService,
    private router: Router, private snackBar: MatSnackBar) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  loginUser() {
    this.User.userLogin(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        let token = data.token;
        localStorage.setItem('Token', token);
        localStorage.setItem('clientID', data.clientID);
        localStorage.setItem('username', data.username);
        this.snackBar.open("Login Successfull", '', { duration: 3000 });
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          console.log(err.error.msg);
          this.snackBar.open(err.error.msg, 'Ups');
        } else {
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 2000,
          });
        }
      });
  }
}
