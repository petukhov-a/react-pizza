import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    size: number;
    type: string;
    count: number;
  }

interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    cartItems: CartItem[];
}

const initialState: CartSliceState = {
    cartItems: [],
    totalCount: 0,
    totalPrice: 0
};

const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}

const calcTotalCount = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.count + sum, 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
        const currentPizza = state.cartItems.find(item => item.id === action.payload.id);

        if (currentPizza) {
            currentPizza.count++;
        } else {
            state.cartItems.push({...action.payload, count: 1});
        }

        state.totalPrice = calcTotalPrice(state.cartItems);
        state.totalCount = calcTotalCount(state.cartItems);
    },

    clearCart(state) {
        state.cartItems = [];
        state.totalCount = 0;
        state.totalPrice = 0;
    },
    removeItem(state, action: PayloadAction<string>) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        state.totalPrice = calcTotalPrice(state.cartItems);
        state.totalCount = calcTotalCount(state.cartItems);
    },
    minusItem(state, action: PayloadAction<string>) {
        const currentPizza = state.cartItems.find(item => action.payload === item.id);
        if (currentPizza && currentPizza.count !== 1) {
            currentPizza.count--;
            state.totalPrice = calcTotalPrice(state.cartItems);
            state.totalCount = calcTotalCount(state.cartItems);
        }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.cartItems.find(item => item.id === id);

export const { addCartItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;