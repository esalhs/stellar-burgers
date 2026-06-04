import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersApi = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const userOrderSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ordersApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(ordersApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  }
});
