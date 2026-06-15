import { rootReducer } from './store';

describe('rootReducer', () => {
  it('возвращает изначальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      ingredients: { ingredients: [], isLoading: false, error: null },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null,
        selectedOrder: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null
      },
      user: { user: null, isAuthChecked: false, isLoading: false, error: null },
      userOrders: { orders: [], isLoading: false, error: null }
    });
  });
});
