import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { Book } from '../Models/Book';
import { UsedBook } from '../Models/used-book';
import { Sale } from '../Models/Sale';

const endpoint = 'https://localhost/clientapi';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  index(): Observable<Book[]> {
    // url: https://localhost/clientapi/index
    return this.http.get<Book[]>(endpoint + '/index');
  }

  searchBooks(term: string): Observable<Book[]> {
    // url: https://localhost/clientapi/search?term=term
    return this.http.get<Book[]>(endpoint + '/search?term=' + term);
  }

  getClientPoints(): Observable<any> {
    // url: https://localhost/clientapi/clientPoints
    return this.http.get<any>(endpoint + '/clientPoints');
  }

  getPointsData(): Observable<any> {
    // url: https://localhost/clientapi/pointsData
    return this.http.get<any>(endpoint + '/pointsData');
  }

  addSale(sale: Sale) {
    // url: https://localhost/clientapi/addSale
    return this.http.post(endpoint + '/makeSale', sale, httpOptions).subscribe(data => {});
  }

  sellBook(formParams: FormData) {
    // url: https://localhost/clientapi/sellBook
    console.log(formParams, "RestService");
    return this.http.post(endpoint + '/sellBook', formParams, httpOptions).subscribe(data => {
      console.log(data, "data");
    });
  }
}
