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
import { FormSellBookComponent } from './form-sell-book/form-sell-book.component';



const appRoutes: Routes = [
  {
  path: '',
  component: IndexComponent,
  data: { title: 'New Books' }
  },
  {
  path: 'cart',
  component: CartComponent,
  data: { title: 'My Shopping Cart' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CartComponent,
    TopbarComponent,
    FormSellBookComponent,
    IndexComponent,
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
