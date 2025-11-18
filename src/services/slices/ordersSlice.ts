import { orderBurgerApi, TNewOrderResponse } from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getBurger = createAsyncThunk('order/create', async (ingredientIds: string[]) =>
  await orderBurgerApi(ingredientIds)
);

type TOrderState = {
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderData: TOrder | null;
}

const initialState: TOrderState = {
  loading: false,
  error: null,
  orderRequest: false,
  orderData: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
      state.orderRequest = false;
    }
  },
    extraReducers: (builder) => {
      builder
        .addCase(getBurger.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.orderRequest = true;
        })
        .addCase(getBurger.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? null;
          state.orderRequest = false;
        })
        .addCase(getBurger.fulfilled, (state, action: PayloadAction<TNewOrderResponse>) => {
          state.loading = false;
          state.orderRequest = false;
          state.orderData = action.payload?.order ?? null;
        });
    }
});

export const { clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export const getOrdersSelector = (state: RootState) => state.order;
export const getOrdersRequestSelector = (state: RootState) => state.order.orderRequest;
export const getOrdersDataSelector = (state: RootState) => state.order.orderData;