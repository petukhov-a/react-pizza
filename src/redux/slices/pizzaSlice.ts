import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

 type FetchPizzasArgs = {
    currentPage: number;
    category: string;
    sortBy: string;
    sortOrder: string;
    search: string;
 }

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { currentPage, category, sortBy, sortOrder, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64de3b97825d19d9bfb254c6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${sortOrder}${search}`
    );
    return data;
  }
);

type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading' // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;