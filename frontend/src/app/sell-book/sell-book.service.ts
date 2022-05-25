import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {

  _url = '';

  constructor(private restService: RestService) { }

  onSubmit(tempBookModel: any, selectedFile: any) {    
    // Create a new form data object  
    const formParams = new FormData();

    // Iterate over all book values and add them to the object
    for (let key in tempBookModel) {
      formParams.append(key, tempBookModel[key]);
    }

    // Add the image to the object
    formParams.append('image', selectedFile);

    // Send the POST request using the restService
    this.restService.sellBook(formParams);
  }
}
