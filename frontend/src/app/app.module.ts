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
import { SearchComponent } from './search/search.component';
import { LoginportalComponent } from './loginportal/loginportal.component';
import { MypurschasesComponent } from './mypurschases/mypurschases.component';
import { MysoldbooksComponent } from './mysoldbooks/mysoldbooks.component';


const appRoutes: Routes = [
  {
  //url: localhost:4200/
  path: '',
  component: IndexComponent,
  data: { title: 'New Books' }
  },
  {
  //url: localhost:4200/login
  path: 'login',
  component: LoginportalComponent,
  data: { title: 'Login' }
  },
  {
  //url: localhost:4200/cart
  path: 'cart',
  component: CartComponent,
  data: { title: 'My Shopping Cart' }
  },
  {
    //url: localhost:4200/search
    path: 'search',
    component: SearchComponent,
    data: { title: 'Search Books' }
  },
  {
    //url: localhost:4200/sellbook
    path: 'sellbook',
    component: SellBookComponent,
    data: { title: 'Sell Book' }
  },
  {
  //url: localhost:4200/mypurschases
  path: 'mypurschases',
  component: MypurschasesComponent,
  data: { title: 'My Purchases' }
  },
  {
  //url: localhost:4200/mysoldbooks
  path: 'mysoldbooks',
  component: MysoldbooksComponent,
  data: { title: 'My Sold Books' }
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
    SearchComponent,
    LoginportalComponent,
    MypurschasesComponent,
    MysoldbooksComponent,
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
