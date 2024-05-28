import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable } from "rxjs";
import { Cart } from "../model/cart.model";
import { ProductItem } from "../model/ProductItem.model";
@Injectable({
  providedIn: 'root'
})
export class CartService{

  private cartItems: any[] = [];
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  host:string="http://localhost:8087/api/carts";

  constructor(private http:HttpClient ) {}

  public getCartBuUserId(userId:string) :Observable<Cart>{
    return this.http.get<Cart>(this.host+"/"+userId)

  }

  public  getAllProductItemsInCart(userId:string):Observable<ProductItem[]>{
    return this.http.get<ProductItem[]>(this.host+"/"+userId+"/items");
  }

  public addItemToCart(userId:string,productId:string,quantity:number): Observable<ProductItem>{
    const params = new HttpParams()
      .set('productId', productId)
      .set('quantity', quantity.toString());
    return this.http.post<ProductItem>(this.host+"/"+userId+"/items",params);
  }
  public removeItemFromCart(userId:string,productItemId:number): Observable<any>{
    return this.http.delete(this.host+"/"+userId+"/items/"+productItemId);

  }
  public updateItemQuantity(userId:string,productItemId:number,quantity:number):Observable<ProductItem>{
    const params = new HttpParams()
      .set('quantity', quantity.toString());
    return this.http.put<ProductItem>(this.host+"/"+userId+"/items/"+productItemId,params);
  }


}
