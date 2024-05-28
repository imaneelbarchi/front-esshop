import { ProductItem } from "./ProductItem.model";

export interface Cart {
  id: string;
  userId: string;
  productItems: ProductItem[];
}
