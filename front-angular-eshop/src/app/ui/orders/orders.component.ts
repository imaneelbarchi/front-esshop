import { Component } from '@angular/core';
import { Order } from '../../model/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders!:Order[];
  constructor(private orderService:OrderService) {
  }
  ngOnInit(){
    this.orderService.findAllOrders().subscribe({
      next:data=>{
        this.orders=data;
        console.log(this.orders)
      }
    })
  }

  getOrderDetails(o:Order) {
    
  }
}
