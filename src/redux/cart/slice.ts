import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { CartItem, CartSliceState } from './types';

const {items, totalPrice, totalCount} = getCartFromLS();

const initialState: CartSliceState = {
    cartItems: items,
    totalCount: totalCount,
    totalPrice: totalPrice
};

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

        console.log(action.payload.size);

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
        if (currentPizza) {
            currentPizza.count--;
            state.totalPrice = calcTotalPrice(state.cartItems);
            state.totalCount = calcTotalCount(state.cartItems);
        }
    },
  },
});

export const { addCartItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;