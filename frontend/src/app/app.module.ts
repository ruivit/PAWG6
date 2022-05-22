import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SellBookComponent } from './sell-book/sell-book.component';


const appRoutes: Routes = [
  {
  //url: localhost:4200/
  path: '',
  component: IndexComponent,
  data: { title: 'New Books' }
  },
  {
  //url: localhost:4200/cart
  path: 'cart',
  component: CartComponent,
  data: { title: 'My Shopping Cart' }
  },
  {
    path: 'sellbook',
    component: SellBookComponent,
    data: { title: 'Sell Book' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CartComponent,
    TopbarComponent,
    IndexComponent,
    SellBookComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
