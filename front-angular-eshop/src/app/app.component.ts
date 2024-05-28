import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-angular-eshop';
  public profile!: KeycloakProfile;
  cartItemCount: number = 0;
  constructor(public keycloakService: KeycloakService,private router:Router, private cartService: CartService) {
  }
  ngOnInit(): void {
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile=profile;
        //console.log(profile)
      });
    }

  }

  async handleLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    })
  }

  handleLogout() {
    this.keycloakService.logout(window.location.origin);
  }

  getCart(){
    this.router.navigateByUrl("/cart/"+this.profile.id);
  }
}
