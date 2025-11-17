import { RootState } from './store';

export const getIngredientsSelector = (state: RootState) => state.ingredients;
export const getConstructorSelector = (state: RootState) => state.constructor;
