import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  editProductFormGroup!: FormGroup;
  productId!:string;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private activatedRoute:ActivatedRoute,private fb:FormBuilder,
              private service:ProductService,
              private router:Router) {
  }

  ngOnInit(): void {


    this.editProductFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });

    this.productId = this.activatedRoute.snapshot.params['id'];

    // Fetch product details from backend
    this.service.getProductById(this.productId).subscribe({
      next: (value) => {
        // Patch product details into form controls
        this.editProductFormGroup=this.fb.group({
          name: this.fb.control(value.name),
          description:this.fb.control(value.description),
          price:this.fb.control(value.price),
          quantity:this.fb.control(value.quantity)

        })

      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });


  }

  handleEditProduct() {
    this.productId=this.activatedRoute.snapshot.params['id'];
    if(this.editProductFormGroup.valid && this.selectedFile) {
      const formData: FormData = new FormData();

      formData.append('name', this.editProductFormGroup.value.name);
      formData.append('description', this.editProductFormGroup.value.description);
      formData.append('price', this.editProductFormGroup.value.price);
      formData.append('quantity', this.editProductFormGroup.value.quantity);
      formData.append('imageFile', this.selectedFile)
      this.service.updateProduct(formData,this.productId).subscribe({
        next: value => {
          alert("Product has been edited !");
          this.editProductFormGroup.reset();
          this.router.navigateByUrl("/products");
        }, error: err => {
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
