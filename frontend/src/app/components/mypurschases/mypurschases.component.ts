import { Component, OnInit } from '@angular/core';

import { RestService } from '../../services/rest/rest.service';
import { CartService } from '../cart/cart.service';
@Component({
  selector: 'app-mypurschases',
  templateUrl: './mypurschases.component.html',
  styleUrls: ['./mypurschases.component.css']
})
export class MypurschasesComponent implements OnInit {

  purchases: any = [];

  constructor(private restService: RestService,
    private cartService: CartService) { }


  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases() {
    this.restService.getClientPurschases().subscribe(data => {
      this.purchases = data;
    });
  }

  test() {
    console.log(this.cartService.getBooksInCart());
  }
}
