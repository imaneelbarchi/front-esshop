import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Product } from '../model/product.model';
import { ProductImage } from '../model/productImage.model';
import { HttpHeaders } from '@angular/common/http';
import { Page } from '../model/page.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  host:string="http://localhost:8089/api";

  constructor(private http:HttpClient ) {}

  public getProducts(page: number=0, size: number=10):Observable<Page<Product>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Product>>(this.host+"/products", { params: params });
  }

  public searchProducts(keyword: string, page: number = 0, size: number = 10): Observable<Page<Product>> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Product>>(this.host+"/search", { params: params });
  }
  public saveProduct(product:FormData):Observable<Product>{
    return this.http.post<Product>(this.host+"/products",product);
  }

  public getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(this.host+"/products/"+id);

  }
  public updateProduct(product:FormData,id:string):Observable<Product>{
    return this.http.put<Product>(this.host+"/products/"+id,product);
  }
  public deleteProduct(id:string){
    return this.http.delete(this.host+"/products/"+id);
  }

  public getProductImages(productId: string): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`${this.host}/products/${productId}/images`);
  }

}
