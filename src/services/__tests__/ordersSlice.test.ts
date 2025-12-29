import { getBurger, orderReducer, TOrderState } from "../slices/ordersSlice";

describe('Проверка orderReducer', () => {
    const initialState: TOrderState = {
        loading: false,
        error: null,
        orderRequest: false,
        orderData: null
    };
    test('Pending', () => {
        const state = orderReducer(initialState, {type: getBurger.pending.type});
        expect(state).toEqual({
            loading: true,
            error: null,
            orderRequest: true,
            orderData: null
        });
    });
    test('Fulfilled', () => {
        const mockOrderData = {
            _id: '12345',
            ingredients: ['ingredient1', 'ingredient2'],
            status: 'done',
            name: 'Test Order',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            number: 1
        };
        const state = orderReducer(initialState, {
            type: getBurger.fulfilled.type,
            payload: { order: mockOrderData }
        });
        expect(state).toEqual({
            loading: false,
            error: null,
            orderRequest: false,
            orderData: mockOrderData
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = orderReducer(initialState, {
            type: getBurger.rejected.type,
            error: {message: errorMessage}
        });
        expect(state).toEqual({
            loading: false,
            error: errorMessage,
            orderRequest: false,
            orderData: null
        });
    });
});