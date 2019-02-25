import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', component: ClientHomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: ClientCheckoutComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  { path: 'addbook', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'books/:id', component: EditBookComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
