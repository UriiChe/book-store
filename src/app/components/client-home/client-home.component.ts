import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BasketService } from '../../services/basket.service';
 
@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
  books:Book[]=[];
  basketItems=[];
  constructor(public booksService: BooksService,
              public basketService: BasketService,
              public flashmessage: FlashMessagesService) { }

  ngOnInit() {
    // get items from basket
       this.basketService.getBasketItem().subscribe(items=>{
        if(items.length){
          this.basketItems = items;
        }
      })
    // Get all books
    this.booksService.getBooks().subscribe((books:Book[])=>{
      this.books = books;
      if(this.basketItems.length){
        this.basketItems.forEach(item=>{
          this.books.forEach(book=>{
            if(book.id === item.id){
              book.isAddBasket = true;
            }
            return book;
          })
        })
      }
    });
    // Subscribe on delete item from basket
    this.basketService.clearAllItemsEvent.subscribe(event=>{
      if (event){
        this.books.forEach(book=>{
          book.isAddBasket = false;
          return book;
        })
      }
    });
    // subscribe on change isAddBasket status
    this.basketService.basketStatusEvent.subscribe(id=>{
      this.books.forEach(book=>{
        if(book.id === id){
          book.isAddBasket = false;
          return book;
        }
      })
    })
  };

  addBookToBasket(book){
    const newBasketItem = {
      id: book.id,
      name: book.name,
      count: 1,
      price: book.price,
      sum: book.price
    };
    this.basketService.addItem(newBasketItem).subscribe(book=>{
      if(book){
        this.flashmessage.show('Item successfully added to basket', {
          cssClass: 'alert alert-success', timeout: 2500, closeOnClick: true
        })
      }
    })
  };
  deleteBookFromBasket(id:string){
    this.basketService.deleteItem(id);
  };

}
