import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { Book } from '../Models/Book';
import { Sale } from '../Models/Sale';

const endpoint = 'https://localhost/clientapi';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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

  getClientPoints(): Observable<any> {
    // url: https://localhost/clientapi/clientPoints
    return this.http.get(endpoint + '/clientPoints');
  }

  getPointsData(): Observable<any> {
    // url: https://localhost/clientapi/pointsData
    return this.http.get(endpoint + '/pointsData');
  }

  // make the sale to the API
  makeSale(sale: Sale) {
    console.log(sale);
    // url: https://localhost/clientapi/makeSale
    return this.http.post(endpoint + '/asd', sale, httpOptions);
  }
}
