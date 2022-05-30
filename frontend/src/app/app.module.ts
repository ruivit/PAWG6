//#region Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
//#endregion


//#region Components
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { IndexComponent } from './components/index/index.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SellBookComponent } from './components/sell-book/sell-book.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitorComponent } from './components/visitor/visitor.component';
//#endregion

//#region Routes
const appRoutes: Routes = [
  {
    //url: localhost:4200/
    path: '',
    component: VisitorComponent,
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/client
    path: 'client',
    component: IndexComponent,
    canActivate: [AuthGuard],
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/cart
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' }
  },
  {
    //url: localhost:4200/myprofile
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard],
    data: { title: 'My Profile' }
  },
  {
    //url: localhost:4200/login
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    //url: localhost:4200/signup
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Signup' }
  },
  {
    //url: localhost:4200/sellBook
    path: 'sellBook',
    component: SellBookComponent,
    data: { title: 'Sell us a Book' }
  },
];
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    IndexComponent,
    CartComponent,
    NavbarComponent,
    SellBookComponent,
    LoginComponent,
    SignupComponent,
    MyprofileComponent,
    VisitorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
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
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }, BooksComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
