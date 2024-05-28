import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId!:string;
  product!: Product;
  constructor(private activatedRoute:ActivatedRoute,
              private service:ProductService,
              private router:Router) {
  }
  ngOnInit(){
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.service.getProductById(this.productId).subscribe({
      next:value =>{
        this.product=value;
      },error: err => {
        console.log(err)
      }
    })
  }

}
