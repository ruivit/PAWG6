import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {

  _url = '';

  constructor(private restService: RestService) { }

  onSubmit(usedBookModel: any) {
    this.restService.sellBook(usedBookModel);
  }
}
