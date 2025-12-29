import {expect, test, describe} from '@jest/globals';
import { getIngredients, ingredientsReducer, TIngredientsState } from '../slices/ingredientsSlice';

describe('Проверка ingredientsReducer', () => {
    const initialState: TIngredientsState = {
        ingredients: [],
        loading: false,
        error: null
    }
    test('Pending', () => {
        const state = ingredientsReducer(initialState, {type: getIngredients.pending.type});
        expect(state).toEqual({
            ingredients: [],
            loading: true,
            error: null
        })
    });
    test('Fulfilled', () => {
        const mockData = [
        {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
        },
        {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
        }
        ];
        const state = ingredientsReducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: mockData
        });

        expect(state).toEqual({
            ingredients: mockData,
            loading: false,
            error: null
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = ingredientsReducer(initialState, {
            type: getIngredients.rejected.type,
            error: { message: errorMessage}
        });
        expect(state).toEqual({
            ingredients: [],
            loading: false,
            error: errorMessage
        })
    });
});
