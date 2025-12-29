import { getProfileOrders, profileOrdersReducer, TProfileOrderState } from "../slices/profileOrdersSlice";

describe('Проверка profileOrdersReducer', () => {
    const initialState: TProfileOrderState = {
        orders: [],
        feed: {},
        loading: false,
        error: null
    };
    test('Pending', () => {
        const state = profileOrdersReducer(initialState, {type: getProfileOrders.pending.type});
        expect(state).toEqual({
            orders: [],
            feed: {},
            loading: true,
            error: null
        })
    });
    test('Fulfilled', () => {
        const orders = [{_id: '1'}];
        const state = profileOrdersReducer(initialState, {
            type: getProfileOrders.fulfilled.type,
            payload: orders
        });
        expect(state).toEqual({
            orders: [{_id: '1'}],
            feed: {},
            loading: false,
            error: null       
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = profileOrdersReducer(initialState, {
            type: getProfileOrders.rejected.type,
            payload: errorMessage
        });
        expect(state).toEqual({
            orders: [],
            feed: {},
            loading: false,
            error: errorMessage
        })
    });
});