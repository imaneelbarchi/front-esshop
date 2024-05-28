import { Cart } from "./cart.model";
import { Order } from "./order.model";
import { Product } from "./product.model";

export interface ProductItem {
  id: number;
  productId: string;
  price: number;
  quantity: number;
  order: Order; // Assuming you have an Order interface defined
  product?: Product; // Assuming you have a Product interface defined
  cart?: Cart; // Assuming you have a Cart interface defined
}
