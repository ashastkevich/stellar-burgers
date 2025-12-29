import {expect, test, describe} from '@jest/globals';
import { addIngredient, burgerConstructorReducer, IConstructorState, removeIngredient } from '../slices/constructorSlice';

describe('тест добавления и удаления ингредиента', () => {
  const initialState: IConstructorState = {
    bun: null,
    ingredients: []
  };

  const ingredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  };

  test('Добавление ингридиента', () => {
    const state = burgerConstructorReducer(initialState, addIngredient(ingredient));
    expect(state.ingredients).toMatchObject([ingredient]);
  });


  test('Удаление ингридиента', () => {
    const stateWithIngredient = burgerConstructorReducer(initialState, addIngredient(ingredient));
    const stateAfterRemove = burgerConstructorReducer(stateWithIngredient, removeIngredient(stateWithIngredient.ingredients[0]));
    expect(stateAfterRemove.ingredients).toEqual([]);
  });


});