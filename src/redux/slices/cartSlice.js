import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalCount: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
        const currentPizza = state.cartItems.find(item => item.id === action.payload.id);

        if (currentPizza) {
            currentPizza.count++;
        } else {
            state.cartItems.push({...action.payload, count: 1});
        }

        state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
        }, 0);
        state.totalCount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    },
    setTotalCount(state, action) {
        state.totalCount = action.payload
    },
    setTotalPrice(state, action) {
        state.totalPrice = action.payload
    },
    clearCart(state) {
        state.cartItems = [];
        state.totalCount = 0;
        state.totalPrice = 0;
    },
    removeItem(state, action) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
        }, 0);
        state.totalCount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    },
    // countCartItems(state) {
    //     state.totalCount = state.cartItems.reduce((sum, obj) => obj.count + sum, 0);
    // },
    minusItem(state, action) {
        const currentPizza = state.cartItems.find(item => action.payload === item.id);
        if (currentPizza && currentPizza.count !== 1) {
            currentPizza.count--;
        }
    },
  },
});

export const { addCartItem, setTotalCount, setTotalPrice, clearCart, removeItem, countCartItems, calcTotalPrice, plusItem,  minusItem } = cartSlice.actions;

export default cartSlice.reducer;