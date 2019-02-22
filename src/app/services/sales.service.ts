import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SalesService {
  ordersCollection:AngularFirestoreCollection<Order>;
  orderDoc:AngularFirestoreDocument<Order>;
  orders:Observable<Order[]>;
  order:Observable<Order>;
  constructor(public afs: AngularFirestore) { 
    this.ordersCollection = this.afs.collection('orders');
  }
  addNewOrder(order){
    return this.ordersCollection.doc(order.id).set(order).then(()=>{
      return true;
    }).catch(error=>{
      return error;
    })
  }
  editOrder(order){
    return this.ordersCollection.doc(order.id).update(order).then(()=>{
      return true;
    }).catch((error)=>{
      return error;
    });
  }
  getOrders(){
    this.orders = this.ordersCollection.snapshotChanges().pipe(map(collection=>{
      return collection.map(document=>{
        const doc = document.payload.doc.data() as Order;
        doc.id = document.payload.doc.id;
        return doc;
      })
    }))
    return this.orders;
  }
  changeStatus(order){
    return this.ordersCollection.doc(order.id).update({
      status: order.status
    }).then(()=>{
      return true;
    }).catch(error=>{
      return error;
    })
  }
}
