import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { ConfirmedValidator } from './confirmed.validator';

import { Sale } from '../../Models/Sale';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  clientSales = Array<Sale>();
  clientSoldBooks = Array<any>();
  isCollapsed = false;
  clientData = {
    name: JSON.stringify(localStorage.getItem('name')),
    email: JSON.stringify(localStorage.getItem('email')),
    phone: JSON.stringify(localStorage.getItem('phone')),
    address: JSON.stringify(localStorage.getItem('address')),
  }

  form: FormGroup = new FormGroup({});
  
  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private user: UserService,
    private fb: FormBuilder) {

    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      username: localStorage.getItem('username'),
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
    
  get f(){
    return this.form.controls;
  }
   
  submit(){
    this.rest.updatePassword(this.form.value).subscribe(
      (data: any) => { 
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Ups');
        } else {
          this.snackBar.open(err.error.msg, 'Ok', {
            duration: 2000,
          });
        }
      }
    );

    this.snackBar.open('Password updated, please login again', 'Ok', {
      duration: 2000,
    });

    //sleep for 3s
    setTimeout(() => {
      this.user.logout();
    }, 3000);
  }
  
  ngOnInit(): void {

    console.log(this.clientData);

    this.rest.getClientSales().subscribe(
      (data: any) => {
        this.clientSales = data;
        //console.log(this.clientSales);
      }
    );
    this.rest.getClientSoldBooks().subscribe(
      (data: any) => {
        this.clientSoldBooks = data;
        //console.log(this.clientSoldBooks);
      }
    );
  }

  getClientSales() {
    return this.clientSales;
  }

  getClientSoldBooks() {
    return this.clientSoldBooks;
  }

}