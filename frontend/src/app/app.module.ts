//#region Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
//#endregion


//#region Components
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { IndexComponent } from './components/index/index.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//#endregion

//#region Services
//#endregion

//#region Style
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//#endregion

//#region Routes
const appRoutes: Routes = [
  {
    //url: localhost:4200/
    path: '',
    component: IndexComponent,
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/cart
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' }
  },
];
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    IndexComponent,
    CartComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatGridListModule, 
    MatSnackBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
