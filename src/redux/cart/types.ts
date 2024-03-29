export type CartItem = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    size: number;
    type: string;
    count: number;
  }

export interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    cartItems: CartItem[];
}