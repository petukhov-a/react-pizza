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
    },
    clearCart(state) {
        state.pizzas = [];
        state.totalCount = 0;
        state.totalPrice = 0;
    },
    deletePizza(state, action) {
        const pizzaIndex = state.pizzas.findIndex(item => item.id === action.payload);
        if (pizzaIndex !== -1) {
            state.pizzas.splice(pizzaIndex, 1);
        }
    },
    countPizzas(state) {
        let count = 0;
        if (state.pizzas.length > 0) {
            state.pizzas.forEach(item => count += item.count);
        }
        state.totalCount = count;
    },
    calcTotalPrice(state) {
        let price = 0;
        if (state.pizzas.length > 0) {
            state.pizzas.forEach(item => price += item.price * item.count);
        }
        state.totalPrice = price;
    },
    increasePizzas(state, action) {
        const currentPizza = state.pizzas.find(item => action.payload === item.id);
        if (currentPizza) {
            currentPizza.count++;
        }
    },
    decreasePizzas(state, action) {
        const currentPizza = state.pizzas.find(item => action.payload === item.id);
        if (currentPizza && currentPizza.count !== 1) {
            currentPizza.count--;
        }
    }
  },
});

export const { setCartItem, setTotalCount, setTotalPrice, clearCart, deletePizza, countPizzas, calcTotalPrice, increasePizzas, decreasePizzas } = cartSlice.actions;

export default cartSlice.reducer;