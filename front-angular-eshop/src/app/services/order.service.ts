
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable } from "rxjs";
import { Order } from "../model/order.model";
import { HttpClient, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class OrderService{

  host:string="http://localhost:8087/api/orders";

  constructor(private http:HttpClient ) {}

  public findAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.host);
  }
  public findAOrderById(id:string):Observable<Order>{
    return this.http.get<Order>(this.host+"/"+id);
  }
  public createOrderFromCart(userId:string,userName:string):Observable<Order>{

    return this.http.post<Order>(this.host+"/create-from-cart/"+userId,userName);
  }


}
