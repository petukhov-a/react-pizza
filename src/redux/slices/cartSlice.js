import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pizzas: [],
    totalCount: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem(state, action) {
        const currentPizza = state.pizzas.find(item => item.id === action.payload.id);

        if (currentPizza) {
            currentPizza.count++;
        } else {
            state.pizzas.push({...action.payload, count: 1});
        }
    },
    setTotalCount(state, action) {
        state.totalCount = action.payload
    },
    setTotalPrice(state, action) {
        state.totalPrice = action.payload
    }
  },
});

export const { setCartItem, setTotalCount, setTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;