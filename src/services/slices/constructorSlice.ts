import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

export interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      };
      state.ingredients.push(newIngredient);
    },
    removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(ing => ing.id !== action.payload.id)
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = []
    }
  }
});

export const {addBun, addIngredient, removeIngredient, clearConstructor} = constructorSlice.actions;

export const burgerConstructorReducer = constructorSlice.reducer;
export const getConstructorSelector = (state: RootState) => state.burgerConstructor;
