import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BooksService } from './services/books.service';
import { IdService } from './services/id.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './components/registration/registration.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CurrencyComponent } from './components/currency/currency.component';
import { BasketComponent } from './components/basket/basket.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { BasketService } from './services/basket.service';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    AddBookComponent,
    EditBookComponent,
    AboutComponent,
    NotFoundComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    CustomDatePipe,
    CurrencyComponent,
    BasketComponent,
    ClientHomeComponent,
    ClientCheckoutComponent,
    OrdersComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [BooksService, IdService, AuthService, BasketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
