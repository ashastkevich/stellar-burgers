import { getOrdersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getProfileOrders = createAsyncThunk('getOrders', async () => await getOrdersApi()
);

type TProfileOrderState = {
  orders: TOrder[];
  feed: {};
  loading: boolean;
  error: string | null;
}

const initialState: TProfileOrderState = {
  orders: [],
  feed: {},
  loading: false,
  error: null
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProfileOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfileOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? null;
        })
        .addCase(getProfileOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        });
    }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
export const getProfileOrdersSelector = (state: RootState) => state.profileOrders.orders;
