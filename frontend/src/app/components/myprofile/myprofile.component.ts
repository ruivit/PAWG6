import { Component, OnInit } from '@angular/core';

import { Sale } from '../../Models/Sale';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  clientSales = Array<Sale>();
  clientSoldBooks = Array<any>();


  updatePasswordForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.rest.getClientSales().subscribe(
      (data: any) => {
        this.clientSales = data;
        console.log(this.clientSales);
      }
    );
    this.rest.getClientSoldBooks().subscribe(
      (data: any) => {
        this.clientSoldBooks = data;
        console.log(this.clientSoldBooks);
      }
    );
  }

  getClientSales() {
    return this.clientSales;
  }

  getClientSoldBooks() {
    return this.clientSoldBooks;
  }

  updatePassword() {
    let formParams = new FormData();
    this.updatePasswordForm.value.username = localStorage.getItem('username');
    for (let key in this.updatePasswordForm.value) {
      formParams.append(key, this.updatePasswordForm.value[key]);
    }

    this.rest.updatePassword(formParams).subscribe(
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
    // NAO FUNCIONA
    // todo add popup
  }
}
