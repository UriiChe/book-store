import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from 'src/app/services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book:Book;
  bookId:string;
  constructor( public booksService: BooksService,
               public activatedRoute: ActivatedRoute,
               public router: Router,
               public basketService: BasketService,
               public flashMessages: FlashMessagesService) { 
                this.book = {
                  name: '',
                  author: '',
                  description: '',
                  date: '',
                  links: [
                    {
                      type: "epub",
                      link: ''
                    },
                    {
                      type: "pdf",
                      link: ''
                    }
                  ],
                  price: 0
                }
              }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.booksService.getBookById(this.bookId).toPromise().then((book:any)=>{
      if(book){
        this.book = book;
        // subscribe on change isAddBasket status
        this.basketService.purchaseList.forEach(purchase=>{
          if(this.book.id === purchase.id){
            this.book.isAddBasket = true;
          }
        })
      }
    }).catch((error)=>{
      this.flashMessages.show(error.messages, {
        cssClass: "alert alert-danger", timeout: "2500"
      });
      this.router.navigate(['']);
    })  
  }

  addBookToBasket(book){
    this.basketService.addItem(book).subscribe(book=>{
      this.flashMessages.show("The book was successfully added to basket", {
        cssClass: "alert alert-success", timeout: "2500"
      })
    })
  }
  deleteBookFromBasket(id){
    this.basketService.deleteItem(id);
  }
}
