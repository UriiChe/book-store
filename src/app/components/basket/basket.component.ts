import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems=[];

  constructor( public basketService:BasketService) { }

  ngOnInit() {
    // Get all baskets
    this.basketService.getBasketItem().subscribe(items=>{
      this.basketItems = items;
    });
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
