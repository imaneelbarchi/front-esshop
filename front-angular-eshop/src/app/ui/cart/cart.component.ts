import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { ProductItem } from '../../model/ProductItem.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartTotal: number = 0;
  productItems: ProductItem[]=[];
  public userId! :any;
  public userName!:string;
  constructor(private cartService: CartService,private userService:UserService,private orderService:OrderService,private activatedRoute:ActivatedRoute,private router:Router) {
  }
  ngOnInit(){
    this.userId=this.activatedRoute.snapshot.params['userId'];
    console.log(this.userId)
    this.loadCart();
    //this.calculateCartTotal();;
    this.userService.getUserById(this.userId).subscribe({
      next:user =>{
        console.log(user)
        this.userName=user.firstName;
      }
    })
  }

  loadCart(){
    this.cartService.getCartBuUserId(this.userId).subscribe({
      next:data =>{
       this.productItems=data.productItems;
        this.calculateCartTotal();
        console.log(this.productItems)
      }
    })

  }

  calculateCartTotal(): void {
    this.cartTotal = this.productItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  handeleDelete(id:number) {
    this.cartService.removeItemFromCart(this.userId,id).subscribe(
      response =>{
        console.log("delete success");
        this.productItems = this.productItems.filter(item => item.id !== id);
        this.calculateCartTotal();
      },error =>{
        console.log("error deleting",error)
      }
    )

  }

  handleQuantityChange(productItemId: number, newQuantity: number) {
    this.cartService.updateItemQuantity(this.userId, productItemId, newQuantity).subscribe(
      response => {
        console.log('Quantity update success');
        const item = this.productItems.find(item => item.id === productItemId);
        if (item) {
          item.quantity = newQuantity;
          this.calculateCartTotal();
        }
      },
      error => {
        console.error('Error updating quantity', error);
      }
    );
  }

  handleContinueShopping() {
    this.router.navigateByUrl("/products");
  }

  handleCheckout() {
    console.log(this.userName)
    this.orderService.createOrderFromCart(this.userId,this.userName).subscribe({
      next:data => {
        console.log("order : ",data)
        this.loadCart();
    },error :err=>{
        console.log("error creating order",err)
    }
    })
  }
}
