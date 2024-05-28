import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './ui/edit-product/edit-product.component';
import { NewProductsComponent } from './ui/new-products/new-products.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import {ProductsComponent} from "./ui/products/products.component";
import {AuthGuard} from "./guards/auth.guard";
import { UsersComponent } from './ui/users/users.component';
import { CartComponent } from './ui/cart/cart.component';
import { OrdersComponent } from './ui/orders/orders.component';

const routes: Routes = [
  {path: "addNewProduct",component:NewProductsComponent,canActivate :[AuthGuard], data:{roles: ['ADMIN']} },
  {path: "products",component: ProductsComponent,canActivate :[AuthGuard], data:{roles: ['USER']}},
  {path: "editProduct/:id",component: EditProductComponent,canActivate :[AuthGuard], data:{roles: ['ADMIN']}},
  {path: "productDetails/:id",component: ProductDetailsComponent,canActivate :[AuthGuard], data:{roles: ['USER']}},
  {path: "users",component: UsersComponent,canActivate :[AuthGuard], data:{roles: ['USER']}},
  {path: "cart/:userId",component: CartComponent,canActivate :[AuthGuard], data:{roles: ['USER']}},
  {path: "orders",component: OrdersComponent,canActivate :[AuthGuard], data:{roles: ['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
