import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems=[];
  isAuthenticate: boolean;
  constructor( public basketService:BasketService,
               public auth: AuthService) { }

  ngOnInit() {
    // Get all baskets
    this.basketService.getBasketItem().subscribe(items=>{
      this.basketItems = items;
    });
    this.auth.checkAuth().subscribe(authStatus=>{
      if(authStatus){
        this.isAuthenticate = true;
      } else this.isAuthenticate = false;
    })
  }
  buyBook(){
  }
  clearBasket(){
    this.basketService.clearBasket();
  }
  deleteBasketItem(id:string){
    this.basketService.deleteItem(id);
  }
}
