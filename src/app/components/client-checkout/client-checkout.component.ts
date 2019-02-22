import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BasketService } from '../../services/basket.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { SalesService } from '../../services/sales.service';
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.scss']
})
export class ClientCheckoutComponent implements OnInit {
  checkoutList:Book[]=[];
  addressIsVisible: false;
  checkOutForm:FormGroup;
  totalSum:number = 0;
  constructor( public basketService:BasketService,
               public fleshMessage: FlashMessagesService,
               public router: Router,
               public fb: FormBuilder,
               public salesService: SalesService,
               public idService: IdService ) { 
    this.checkOutForm = this.fb.group({
      "name": ["", Validators.required],
      "email": ["", [Validators.required, Validators.email]],
      "phone": ["", Validators.required]
    })
  }

  ngOnInit() {
    this.basketService.getBasketItem().subscribe(books=>{
      if(!books.length){
        this.router.navigate(['/']);
      } else this.checkoutList = books;
      this.totalSum = this.checkoutList.reduce((sum, item)=>{
        return sum += item.price;
      }, 0)
    });
  };
  deleteBasketItem(id:string){
    this.basketService.deleteItem(id);
    if(!this.checkoutList.length){
      this.fleshMessage.show('Your basket is empty', {
        cssClass: 'alert-danger', timeout: 2000
      });
      this.router.navigate(['/']);
    }
  };
  onChangeItemCount(item){
    item.sum = item.price * item.count;
    this.totalSum = this.checkoutList.reduce((sum, item)=>{
      return sum += item.sum;
    }, 0)
  };
  getUserNameError(){
    return this.checkOutForm.controls['name'].hasError('required') ? 'Необходимо ввести свое имя' : '';
  }
  getUserEmailError(){
    return this.checkOutForm.controls['email'].hasError('required') ? 'Необходимо ввести свой email': 
    this.checkOutForm.controls['email'].hasError('email') ? 'Email введен неверно' : '';
  }
  getUserPhoneError(){
    return this.checkOutForm.controls['phone'].hasError('required') ? 'Необходимо ввести номер своего телефона' : '';
  }
  onSubmit(){
    const newOrder = {
      ...this.checkOutForm.value,
      items: this.checkoutList,
      status: "processing",
      total: this.totalSum,
      id: this.idService.generate()
    }
    this.salesService.addNewOrder(newOrder).then((order)=>{
      if(order){
        this.router.navigate(['/']);
        this.basketService.clearBasket();
        this.fleshMessage.show("Your purchase has been successfully completed, our specialists will call your back.", {
          cssClass: "alert-success", timeout: 3500
        })
      }
    });
  }
}
