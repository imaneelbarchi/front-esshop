import { ProductItem } from "./ProductItem.model";

export interface Order {
  id: string;
  userId: string;
  userName: string;
  date: Date;
  state: OrderState;
  productItems: ProductItem[];
}

export enum OrderState {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
