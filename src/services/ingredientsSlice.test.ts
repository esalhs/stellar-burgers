import { TIngredient } from '@utils-types';
import { ingredientsApi, ingredientsSlice } from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
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
    image_mobile: 'test-mobile2.png'
  }
];

describe('загрузка ингредиентов', () => {
  it('успешно', () => {
    const newState = ingredientsSlice.reducer(
      ingredientsSlice.getInitialState(),
      ingredientsApi.fulfilled(mockIngredients, '')
    );
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.error).toEqual(null);
    expect(newState.isLoading).toEqual(false);
  }),
    it('загрузка', () => {
      const newState = ingredientsSlice.reducer(
        ingredientsSlice.getInitialState(),
        ingredientsApi.pending('')
      );
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toEqual(null);
      expect(newState.isLoading).toEqual(true);
    }),
    it('ошибка', () => {
      const newState = ingredientsSlice.reducer(
        ingredientsSlice.getInitialState(),
        ingredientsApi.rejected(null, '')
      );
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toEqual('Rejected');
      expect(newState.isLoading).toEqual(false);
    });
});
