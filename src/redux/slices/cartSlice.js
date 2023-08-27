import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem(state, action) {
        const currentPizza = state.find(item => item.id === action.payload.id);

        if (currentPizza) {
            currentPizza.count++;
        } else {
            state.push({...action.payload, count: 1});
        }
    }
  },
});

export const { setCartItem } = cartSlice.actions;

export default cartSlice.reducer;