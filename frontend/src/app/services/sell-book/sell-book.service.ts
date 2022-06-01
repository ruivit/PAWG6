import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TempBook } from 'src/app/Models/temp-book';

import { RestService } from '../rest/rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {

  _url = 'https://localhost/clientapi/sellBook';
  constructor(private restService: RestService,
    private _http: HttpClient,
    private router: Router) { }

  onSubmit(tempBookModel: TempBook, selectedFile: any) {
        
    return this._http.post<any>(this._url, { tempBookModel, selectedFile }).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
      /* // Create a new form data object  
    const formParams = new FormData();
/* 
    // Iterate over all book values and add them to the object
    for (let key in tempBookModel) {
      formParams.append(key, tempBookModel[key]);
    }

    // Add the image to the object
    formParams.append('image', selectedFile); */ 

    // Send the POST request using the restService
    //this.restService.sellBook(tempBookModel, selectedFile);
    //}

    // Redirect to the home page
    //this.router.navigate(['/']);
}

