import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzasArgs, Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzaStatus',
    async (params) => {
      const { currentPage, category, sortBy, sortOrder, search } = params;
      const { data: pageData } = await axios.get<Pizza[]>(
        `https://64de3b97825d19d9bfb254c6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${sortOrder}${search}`
      );
      return pageData;
    }
  );