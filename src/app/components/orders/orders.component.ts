import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { SalesService } from '../../services/sales.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isEdit:boolean = false;
  constructor( public salesService: SalesService,
               public fleshMessages: FlashMessagesService) { }

  ngOnInit() {
    // Get orders from server
    this.salesService.getOrders().subscribe(orders=>{
      if(orders.length){
        this.orders = orders;
      } else {
        this.fleshMessages.show("There are no orders yet", {
          cssClass: "alert-warning", timeout: 2500
        });
      }
    })
  }
  onChangeItemCount(item, order){
    order.isEdit = true;
    item.sum = item.price * item.count;
    order.total = order.items.reduce((sum, item)=>{
      return sum += item.sum;
    }, 0)
  }
  deleteBasketItem(item, order){
    const index = order.items.indexOf(item);
    order.items.splice(index, 1);
    this.onChangeItemCount(item, order);
  }
  saveChanges(order){
    this.salesService.editOrder(order).then(()=>{
      this.fleshMessages.show("Purchase has been successfully updated", {
        cssClass: "alert-success", timeout: 2500
      })
    }).catch(error=>{
      this.fleshMessages.show(error.messages, {
        cssCass: "alert-danger", timeout: 3000
      })
    })
  }
  changeStatus(order){
    this.salesService.changeStatus(order).then((status)=>{
      if(status){
        this.fleshMessages.show("Purchase status successfull updated", {
          cssClass: "alert-success", timeout: 2500
        });
      }
    }).catch(error=>{
      this.fleshMessages.show(error.messages, {
        cssClass: "alert-danger", timeout: 2500
      })
    })
  }
}
