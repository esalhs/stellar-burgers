import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const burgerApi = createAsyncThunk(
  'constructor/getConstructor',
  async (ingredientsIds: string[]) => await orderBurgerApi(ingredientsIds)
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (element) => element.id !== action.payload.id
      );
    },
    clearOrder: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const ingredients = state.ingredients;
      const { from, to } = action.payload;
      const firstPlace = ingredients[from];
      ingredients[from] = ingredients[to];
      ingredients[to] = firstPlace;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(burgerApi.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(burgerApi.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order as unknown as TOrder;
      })
      .addCase(burgerApi.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearOrder,
  moveIngredient
} = constructorSlice.actions;
