import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


import { Book } from '../Models/Book';

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

}
