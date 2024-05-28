import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent {
  newProductFormGroup!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(private fb:FormBuilder,
              private service:ProductService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.newProductFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      description:this.fb.control(null,[Validators.required]),
      price:this.fb.control(null,[Validators.required]),
      quantity:this.fb.control(null,[Validators.required]),
      //image:this.fb.control(null,[Validators.required])
    })
  }

  handleSaveProduct() {
   // let product:Product=this.newProductFormGroup.value;
    if(this.newProductFormGroup.valid && this.selectedFile){
      const formData: FormData = new FormData();
      formData.append('name', this.newProductFormGroup.value.name);
      formData.append('description', this.newProductFormGroup.value.description);
      formData.append('price', this.newProductFormGroup.value.price);
      formData.append('quantity', this.newProductFormGroup.value.quantity);
      formData.append('imageFile',this.selectedFile)
      this.service.saveProduct(formData).subscribe({
        next:value => {
          alert("Product has been saved !");
          this.newProductFormGroup.reset();
          this.router.navigateByUrl("/products");
        },error:err => {
          console.log(err);
        }
      });
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }
  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }
}
