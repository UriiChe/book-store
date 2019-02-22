import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  
  currency:Currency[] = [
    {
      name: 'USD',
      isActive: true,
      coefficient: 1
    },
    {
      name: 'GBP',
      isActive: false,
      coefficient: 0.7
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 0.9
    }
  ];

  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  selectedCurrency = this.currencySource.asObservable();
    

  constructor() { }

  selectCurrency(name:string){
    this.currency = this.currency.map(currency=>{
      (currency.name === name)? currency.isActive = true:currency.isActive = false;
      return currency;
    })
    this.currencySource.next(this.currency);
  }
}
