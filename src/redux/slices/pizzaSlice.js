import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { currentPage, category, sortBy, sortOrder, search } = params;
    const { data } = await axios.get(
      `https://64de3b97825d19d9bfb254c6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${sortOrder}${search}`
    );
    return data;
  }
)

const initialState = {
    items: [],
    status: 'loading' // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;