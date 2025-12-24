import { rootReducer } from '../store';
import { configureStore } from '@reduxjs/toolkit';

describe('Инциализация rootReducer', () => {
  it('проверка наличия initialState и всех слайсов', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState).toBeDefined();
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('order');
  });

  it('проверка корректности initialState для слайса ingredients', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.ingredients).toHaveProperty('ingredients');
    expect(initialState.ingredients).toHaveProperty('loading');
    expect(initialState.ingredients).toHaveProperty('error');
    expect(initialState.ingredients.ingredients).toEqual([]);
    expect(initialState.ingredients.loading).toBe(false);
    expect(initialState.ingredients.error).toBeNull();
  });

  it('проверка корректности initialState для слайса burgerConstructor', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.burgerConstructor).toHaveProperty('bun');
    expect(initialState.burgerConstructor).toHaveProperty('ingredients');
    expect(initialState.burgerConstructor.bun).toBeNull();
    expect(initialState.burgerConstructor.ingredients).toEqual([]);
  });

  it('проверка корректности initialState для слайса user', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.user).toHaveProperty('isAuthChecked');
    expect(initialState.user).toHaveProperty('isAuthenticated');
    expect(initialState.user).toHaveProperty('data');
    expect(initialState.user).toHaveProperty('loginUserError');
    expect(initialState.user).toHaveProperty('loginUserRequest');
    expect(initialState.user.isAuthChecked).toBe(false);
    expect(initialState.user.isAuthenticated).toBe(false);
    expect(initialState.user.data).toBeNull();
    expect(initialState.user.loginUserError).toBeNull();
    expect(initialState.user.loginUserRequest).toBe(false);
  });

  it('проверка корректности initialState для слайса feeds', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.feeds).toHaveProperty('orders');
    expect(initialState.feeds).toHaveProperty('loading');
    expect(initialState.feeds).toHaveProperty('error');
    expect(initialState.feeds.orders).toEqual([]);
    expect(initialState.feeds.loading).toBe(false);
    expect(initialState.feeds.error).toBeNull();
  });

  it('проверка корректности initialState для слайса profileOrders', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.profileOrders).toHaveProperty('orders');
    expect(initialState.profileOrders).toHaveProperty('loading');
    expect(initialState.profileOrders).toHaveProperty('error');
    expect(initialState.profileOrders.orders).toEqual([]);
    expect(initialState.profileOrders.loading).toBe(false);
    expect(initialState.profileOrders.error).toBeNull();
  });

  it('проверка корректности initialState для слайса order', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    
    expect(initialState.order).toHaveProperty('loading');
    expect(initialState.order).toHaveProperty('error');
    expect(initialState.order).toHaveProperty('orderRequest');
    expect(initialState.order).toHaveProperty('orderData');
    expect(initialState.order.loading).toBe(false);
    expect(initialState.order.error).toBeNull();
    expect(initialState.order.orderRequest).toBe(false);
    expect(initialState.order.orderData).toBeNull();
  });

  it('проверка имутабельности состояния', () => {
    const state1 = rootReducer(undefined, { type: '@@INIT' });
    const state2 = rootReducer(undefined, { type: '@@INIT' });
    
    expect(state1).toEqual(state2);
    expect(state1).not.toBe(state2);
  });

  it('проверка состояния при неизвестном action', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const nextState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    
    expect(nextState).toEqual(initialState);
  });

  it('проверка корректной работы configureStore', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    
    expect(state).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.burgerConstructor).toBeDefined();
    expect(state.user).toBeDefined();
    expect(state.feeds).toBeDefined();
    expect(state.profileOrders).toBeDefined();
    expect(state.order).toBeDefined();
  });
});
