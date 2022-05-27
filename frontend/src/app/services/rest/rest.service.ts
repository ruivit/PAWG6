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


  getPointsTable(): Observable<any> {
    // url: https://localhost/clientapi/pointsTable
    return this.http.get<any>(api + '/pointsTable');
  }

  getDiscountTable(): Observable<DiscountTable> {
    // url: https://localhost/clientapi/discountTable
    return this.http.get<DiscountTable>(api + '/discountTable');
  }
}
