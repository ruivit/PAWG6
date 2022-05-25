import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {

  _url = '';

  constructor(private restService: RestService) { }

  onSubmit(usedBookModel: any, selectedFile: any) {
    //console.log(usedBookModel);
    console.log(selectedFile, "onSubmit service");
    const formParams = new FormData();
    formParams.append('title', usedBookModel.title);
    console.log(formParams, "onsubmitformParams");
    this.restService.sellBook(formParams);
  }
}
