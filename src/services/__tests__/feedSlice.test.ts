import { feedReducer, getFeeds, TFeedState } from "../slices/feedSlice"

describe('Проверка feedReducer', () => {
    const initialState: TFeedState = {
      orders: [],
      feed: {},
      loading: false,
      error: null
    };
    test('Pending', () => {
        const state = feedReducer(initialState, {type: getFeeds.pending.type});
        expect(state).toEqual({
            orders: [],
            feed: {},
            loading: true,
            error: null
        })
    });
    test('Fulfilled', () => {
        const feeds = {
            orders: [{_id: '1'}],
            total: 5,
            totalToday: 2
        };
        const state = feedReducer(initialState, {
            type: getFeeds.fulfilled.type,
            payload: feeds
        });
        expect(state).toEqual({
            orders: [{_id: '1'}],
            feed: {total: 5, totalToday: 2},
            loading: false,
            error: null       
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = feedReducer(initialState, {
            type: getFeeds.rejected.type,
            payload: errorMessage
        });
        expect(state).toEqual({
            orders: [],
            feed: {},
            loading: false,
            error: errorMessage
        })
    });
})