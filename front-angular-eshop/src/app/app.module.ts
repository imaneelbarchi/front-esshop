import {APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './ui/products/products.component';
import { NewProductsComponent } from './ui/new-products/new-products.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './ui/edit-product/edit-product.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { UsersComponent } from './ui/users/users.component';
import { CartComponent } from './ui/cart/cart.component';
import { OrdersComponent } from './ui/orders/orders.component';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'e-shop-realm',
        clientId: 'eshop-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NewProductsComponent,
    EditProductComponent,
    ProductDetailsComponent,
    UsersComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    FormsModule
  ],
  providers: [{provide: APP_INITIALIZER,useFactory:initializeKeycloak,multi:true,deps:[KeycloakService] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
