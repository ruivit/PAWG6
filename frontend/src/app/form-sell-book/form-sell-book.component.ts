import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-sell-book',
  templateUrl: './form-sell-book.component.html',
  styleUrls: ['./form-sell-book.component.css']
})
export class FormSellBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(data: any) {
    console.log('submit', data);
  }
}
