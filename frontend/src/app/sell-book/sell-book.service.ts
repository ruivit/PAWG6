import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {

  _url = '';

  constructor(private restService: RestService) { }

  onSubmit(usedBookModel: any, selectedFile: any) {    
    // Create a new form data object  
    const formParams = new FormData();

    // Iterate over all book values and add them to the object
    for (let key in usedBookModel) {
      formParams.append(key, usedBookModel[key]);
    }

    // Add the image to the object
    formParams.append('image', selectedFile);

    // Send the POST request using the restService
    this.restService.sellBook(formParams);
  }
}
