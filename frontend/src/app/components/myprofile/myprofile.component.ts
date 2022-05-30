import { Component, OnInit } from '@angular/core';

import { Sale } from '../../models/Sale';

import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  clientSales = Array<Sale>();
  clientSoldBooks = [];

  constructor(
    private rest: RestService
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
