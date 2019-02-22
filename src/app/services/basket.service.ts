import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { of, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  purchaseList:Book[]=[];
  private clearSource = new BehaviorSubject(true);
  clearAllItemsEvent = this.clearSource.asObservable();
  private basketStatusSource = new BehaviorSubject("");
  basketStatusEvent = this.basketStatusSource.asObservable();
  
  constructor() { }

  getBasketItem(){
    return of(this.purchaseList);
  }
  addItem(book){
    this.purchaseList.push(book);
    return of(book);
  }
  deleteItem(id:string){
    for(let i=0; i<this.purchaseList.length; i++){
      if(this.purchaseList[i].id === id){
        this.purchaseList.splice(i, 1);
        break;
      }
    }
    this.basketStatusSource.next(id);
  }
  clearBasket(){
    this.purchaseList.splice(0, this.purchaseList.length);
    this.clearSource.next(true);
  }
}
 