import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book'; 
import { BooksService } from '../../services/books.service';
import { Router }  from '@angular/router';
import { IdService } from '../../services/id.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookId:string;
  bookForm:FormGroup;

  constructor(
    public booksService: BooksService,
    public router: Router,
    public idService: IdService,
    public flashMessagesService: FlashMessagesService,
    public fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      'name':  ["", Validators.required],
      'author': ["", Validators.required],
      'description': ["", Validators.required],
      'links': this.fb.array([
        this.fb.group({
          'type': ["pdf", Validators.required],
          'link': ["", Validators.required]
        }),
        this.fb.group({
          'type': ["ebn", Validators.required],
          'link': ["", Validators.required]
        })
      ]),
      'price': [0, Validators.required]
    })
   }
    addBook(){
      this.bookId = this.idService.generate();
      const newBook = Object.assign({}, this.bookForm.value, {id: this.bookId, date: firebase.firestore.Timestamp.fromDate(new Date)});
      this.booksService.addBook(newBook).then(book=>{
        if(book){
          this.router.navigate(['/panel']);
        }
        this.flashMessagesService.show(`Book was successfull added!`, {
          cssClass: 'alert-success', timeout: 2500
        })
      }, error=>{
        this.flashMessagesService.show('Failure adding book!', {
          cssClass: 'alert-danger', timeout: 2500
        })
      })
    }

  ngOnInit() {
  }

}
