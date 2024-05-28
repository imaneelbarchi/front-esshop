import { ProductImage } from "./productImage.model";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity:  number;
  image : ProductImage; // Image data for the product
}
