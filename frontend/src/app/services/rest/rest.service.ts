import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';


//#region Constants
const api = 'https://localhost/clientapi';
const baseURl = 'http://localhost:4200/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
//#endregion

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks(type: string): Observable<Book[]> {
    return this.http.get<Book[]>(api + '/books?type=' + type);
  }


  getPointsTable() {
    // url: https://localhost/clientapi/pointsTable
    return this.http.get(api + '/pointsTable');
  }

  getDiscountTable() {
    // url: https://localhost/clientapi/discountTable
    return this.http.get(api + '/discountTable');
  }

  getClientPoints() {
    // url: https://localhost/clientapi/clientPoints
    return this.http.get(api + '/clientPoints?username=' +
      localStorage.getItem('username'));
  }


  getClientSales() {
    // url: https://localhost/clientapi/clientSales
    return this.http.get(api + '/clientSales?username=' +
      localStorage.getItem('username'));
  }


  getClientSoldBooks() {
    // url: https://localhost/clientapi/clientSoldBooks
    return this.http.get(api + '/clientSoldBooks?username=' +
      localStorage.getItem('username'));
  }


  updatePassword(formParams: FormData) {
    // url: https://localhost/clientapi/updatePassword
    return this.http.post(api + '/updatePassword', formParams);
  }

  sellBook(formParams: FormData) {
    // url: https://localhost/clientapi/sellBook
    return this.http.post(api + '/sellBook', formParams).subscribe(data => {
      console.log(data, "data");
    });
  }

  checkout(formParams: FormData) {
    // url: https://localhost/clientapi/makeSale
    return this.http.post(api + '/makeSale', formParams);
  }
}
