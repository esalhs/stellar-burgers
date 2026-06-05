import { TConstructorIngredient, TOrder } from '@utils-types';
import { constructorSlice } from './constructorSlice';

const mockBun: TConstructorIngredient = {
  _id: '1',
  name: 'Тестовая булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: 'test1.png',
  image_large: 'test-large1.png',
  image_mobile: 'test-mobile1.png',
  id: 'unique-id-1'
};

const mockIngredient: TConstructorIngredient = {
  _id: '2',
  name: 'Тестовый ингредиент',
  type: 'ingredient',
  proteins: 2,
  fat: 2,
  carbohydrates: 2,
  calories: 2,
  price: 200,
  image: 'test2.png',
  image_large: 'test-large2.png',
  image_mobile: 'test-mobile2.png',
  id: 'unique-id-2'
};

const mockOrder: TOrder = {
  _id: '3',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2020-01-01 10:00:00',
  updatedAt: '2020-01-01 10:00:00',
  number: 12345,
  ingredients: ['2', '3']
};

describe('конструктор бургера', () => {
  it('добавление булочки', () => {
    const state = constructorSlice.reducer(
      constructorSlice.getInitialState(),
      constructorSlice.actions.addBun(mockBun)
    );
    expect(state.bun).toEqual(mockBun);
  }),
    it('добавление ингредиента', () => {
      const state = constructorSlice.reducer(
        constructorSlice.getInitialState(),
        constructorSlice.actions.addIngredient(mockIngredient)
      );
      expect(state.ingredients).toEqual([mockIngredient]);
    }),
    it('удаление ингредиента', () => {
      const state = {
        ...constructorSlice.getInitialState(),
        ingredients: [mockIngredient]
      };
      const newState = constructorSlice.reducer(
        state,
        constructorSlice.actions.removeIngredient(mockIngredient)
      );
      expect(newState.ingredients).toEqual([]);
    }),
    it('очистить заказ', () => {
      const state = {
        ...constructorSlice.getInitialState(),
        orderModalData: mockOrder,
        orderRequest: true
      };
      const newState = constructorSlice.reducer(
        state,
        constructorSlice.actions.clearOrder()
      );
      expect(newState.orderModalData).toEqual(null);
      expect(newState.orderRequest).toEqual(false);
    }),
    it('переместить ингредиент', () => {
      const state = {
        ...constructorSlice.getInitialState(),
        ingredients: [mockBun, mockIngredient]
      };
      const newState = constructorSlice.reducer(
        state,
        constructorSlice.actions.moveIngredient({ from: 0, to: 1 })
      );
      expect(newState.ingredients).toEqual([mockIngredient, mockBun]);
    });
});
