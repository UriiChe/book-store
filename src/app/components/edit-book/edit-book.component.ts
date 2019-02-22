import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
 
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookId:string;
  book:Book;
  bookForm: FormGroup;
  constructor(
    public booksService: BooksService,
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    public fb: FormBuilder,
    public flashMessagesService: FlashMessagesService ) {
      this.bookForm = this.fb.group({
        name:  ['', Validators.required],
        'author': ['', Validators.required],
        'description': ['', Validators.required],
        'links': this.fb.array([]),
        'price': [0, Validators.required]
      });
      this.book = {
        name: '',
        author: '',
        description: '',
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
  createForm(){
    return this.bookForm = this.fb.group({
      'name':  [this.book.name, Validators.required],
      'author': [this.book.author, Validators.required],
      'description': [this.book.description, Validators.required],
      'links': this.fb.array([]),
      'price': [this.book.price, Validators.required]
    })
  }
  createLinks(){
    const linkArray = <FormArray>this.bookForm.controls['links'];
    for(let link of this.book.links){
      linkArray.push(this.fb.group({
        'type': [link.type, Validators.required],
        'link': [link.link, Validators.required]
    }))
    }
    return linkArray;
  }
  editBook(){ 
    const updateBook = Object.assign({}, this.bookForm.value, {id:this.bookId});
    this.booksService.editBook(updateBook).then(book=>{
      if(book){
        this.router.navigate(['/panel']);
      }
      this.flashMessagesService.show('The book was edited wis success!', {
        cssClass: 'alert-success', timeout: 2500
      })
    }).catch(error=>{
      this.flashMessagesService.show('Failure of the book editing!', {
        cssClass: 'alert-danger', timeout: 2500
      })
    });
  }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.booksService.getBookById(this.bookId).toPromise().then((book:any)=>{
      this.book = book;
    }).then(()=>{
      this.createForm();
    }).then(()=>{
      this.createLinks();
    });
  }
}
