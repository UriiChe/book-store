import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // books:Book[] = [
  //   {
  //     id: '0',
  //     author: "Marijn Haverbeke",
  //     description: "some description text",
  //     name: "Выразительный JavaScript",
  //     link: [
  //       {
  //       type: "epub",
  //       link: "link"
  //     },
  //     {
  //       link: "pdf",
  //       type: "link"
  //     }
  //   ]
  //   }
  // ]
  booksCollection:AngularFirestoreCollection<Book>;
  bookDoc:AngularFirestoreDocument<Book>;
  books:Observable<Book[]>;
  book:Observable<Book>;

  constructor(
    private afs: AngularFirestore  ) {
    this.booksCollection = this.afs.collection('books');
   }

  getBooks(){
    this.books = this.booksCollection.snapshotChanges().pipe(
      map(collection => { return collection.map(document=>{
        const data = document.payload.doc.data() as Book;
        const id = document.payload.doc.id;
        return { id, ...data };
      })
    }));
    return this.books;
  }
  getBookById(id:string){
    this.bookDoc = this.afs.collection('books').doc(id);
    return this.bookDoc.get().pipe(map(book=>{
        if(book.exists){
          const currentBook =  book.data();
          return {id, ...currentBook};
        }
    }), error=>{
      return error;
    })
  }
  addBook(book:Book){
    return this.booksCollection.doc(book.id).set(book).then(()=>{
      return true;
    }).catch(error=>{
      return error;
    });
  }
  editBook(book:Book){
    return this.booksCollection.doc(book.id).update(book).then(()=>{
      return book;
    }, error=>{
      return error;
    });
  }
  deleteBook(id:string){
    return this.booksCollection.doc(id).delete().then(()=>{
      return id;
    }).catch(error=>{
      return error;
    })
  }
}
 