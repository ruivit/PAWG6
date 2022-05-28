import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const api = 'https://localhost/clientapi';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  registerNewUser(payload: any) {
    return this.http.post(api + '/register', payload);
  }

  userLogin(payload: any) {
    return this.http.post(api + '/login', payload);
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('clientID');
    this.router.navigate([ '/login' ]);
  }

  constructor(private http: HttpClient,
    private router: Router) { }

}