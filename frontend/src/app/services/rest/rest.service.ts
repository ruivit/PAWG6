import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';
import { DiscountTable } from 'src/app/models/DiscountTable';


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

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(api + '/books');
  }


  getPointsTable() {
    // url: https://localhost/clientapi/pointsTable
    return this.http.get(api + '/pointsTable');
  }

  getDiscountTable() {
    // url: https://localhost/clientapi/discountTable
    return this.http.get(api + '/discountTable');
  }

  sellBook(formParams: FormData) {
    // url: https://localhost/clientapi/sellBook

    console.log(formParams, "RestService");
    return this.http.post(api + '/sellBook', formParams).subscribe(data => {
      console.log(data, "data");
    });
  }
}
