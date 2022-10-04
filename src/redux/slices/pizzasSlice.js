import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
    async (params) => {
    const {category, sortBy, order, search, currentPage} = params;
    const { data } = await axios.get(`https://62f4d5e7ac59075124c4e906.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
      return data;
    });

const initialState = {
  items: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action){
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending] : (state) => {
        state.status = 'Loading';
        state.items = [];
    },
    [fetchPizzas.fulfilled] : (state, action) => {
        state.items = action.payload;
        state.status = 'success';
    },
    [fetchPizzas.rejected] : (state, action) => {
        state.status = 'error';
        state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
