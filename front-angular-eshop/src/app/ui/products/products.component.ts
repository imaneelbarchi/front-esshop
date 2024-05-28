import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductImage } from '../../model/productImage.model';
import { Product } from '../../model/product.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Page } from '../../model/page.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements  OnInit{
  searchQuery: string = '';
  products: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  public profile!: KeycloakProfile;
  public userId! :any;
  constructor(private service:ProductService,
              private router:Router,public keycloakService: KeycloakService,
              private cartService: CartService) {
  }


  ngOnInit(): void {
    this.loadProducts();
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
    }

  getImageUrl(image: ProductImage): string {
    return 'data:image/png;base64,' + image.data;
  }

  loadProducts(page: number = 0, size: number = 5): void {
    this.service.getProducts(page, size)
      .subscribe((response: Page<Product>) => {
        this.products = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.pageSize = response.size;
      });
  }
  goToPage(page: number): void {
    this.loadProducts(page);
  }
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i);
  }

  handleDelete(p:Product) {
    let conf=confirm("Are you sure");
    if(!conf) return;
    this.service.deleteProduct(p.id).subscribe({
      next:() => {
        this.loadProducts();
      },error:err => {
        console.log(err);
      }
    });
  }

  handleEdit(product:Product) {
    this.router.navigateByUrl("/editProduct/"+product.id)

  }

  viewProduct(product:Product) {
    this.router.navigateByUrl("/productDetails/"+product.id)
  }

  searchProducts(page: number = 0, size: number = 5): void {
    console.log(this.searchQuery)
    if (this.searchQuery.trim() !== '') {
      this.service.searchProducts(this.searchQuery,page,size).subscribe({
        next: (response: Page<Product>) => { // Explicitly specify the type of response
          this.products = response.content;
          this.currentPage = response.number;
          this.totalPages = response.totalPages;
          this.pageSize = response.size;
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
          // Handle the error as needed
        }
      });
    } else {
      // If search query is empty, load all products
      this.loadProducts(page,size);
    }
  }


  addToCart(productId:string) {

    this.userId=this.profile.id;
    this.cartService.addItemToCart(this.userId,productId,1).subscribe({
      next:data =>{
        console.log("product added successfuly");
        alert("Product added to cart successfully!")
      },error:err =>{
        console.log(err);
      }
    })

  }
}
