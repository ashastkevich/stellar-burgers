import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getFeeds = createAsyncThunk('getFeed', async () =>
  getFeedsApi()
);

type TFeedState = {
  orders: TOrder[];
  feed: {};
  loading: boolean;
  error: string | null;
}

const initialState: TFeedState = {
  orders: [],
  feed: {},
  loading: false,
  error: null
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFeeds.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getFeeds.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? null;
        })
        .addCase(getFeeds.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.feed = {
            total: action.payload.total,
            totalToday: action.payload.totalToday
          }
        });
    }
});

export const feedReducer = feedSlice.reducer;
export const getFeedsSelector = (state: RootState) => state.feeds;