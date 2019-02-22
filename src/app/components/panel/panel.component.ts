import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from 'src/app/models/currency';
 
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  books: Book[];
  searchingResult: Book[]=[];
  searchText: string;
  currentCurrency: Currency;
  constructor(private _bookService: BooksService,
              public fleshMessagesService: FlashMessagesService,
              private currencyService: CurrencyService) { }
 
  ngOnInit() {
    // Get all books
    this._bookService.getBooks().subscribe((books:Book[])=>{
      this.books = books;
    })
    // Subscribe on currency update
    this.currencyService.selectedCurrency.subscribe(currency=>{
      this.currentCurrency = Object.create(currency.find(obj=>obj.isActive));
    })
  }

  searchBook(){
    this.searchingResult = this.books.filter(book=>book.name.toLowerCase().indexOf(this.searchText) !== -1);
  }
  deleteBook(id:string){
    this._bookService.deleteBook(id).then(data=>{
      if(data){
        this._bookService.getBooks().subscribe((books:Book[])=>{
          this.books = books;
        })
      }
      this.fleshMessagesService.show('Delete book success!', 
      {cssClass: 'alert-success', timeout: 2500});
    },
    error=>{
      this.fleshMessagesService.show('Failure deleting book!', 
      {cssClass: 'alert-danger', timeout: 2500});
    });
  }
  

}
