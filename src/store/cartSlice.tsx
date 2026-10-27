import type {DishType} from '@/types';
import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

type CartType = {
  total: number;
  delivery: number;
  discount: number;
  subtotal: number;
  promoCode: string;
  list: DishType[];
  discountAmount: number;
};
const initialState: CartType = {
  total: 0,
  delivery: 0,
  discount: 0,
  subtotal: 0,
  promoCode: '',
  list: [],
  discountAmount: 0,
};
const recalculate = (state: CartType) => {
  state.subtotal = state.list.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );
  if (state.subtotal < 500) {
    state.discount = 0;
    state.promoCode = '';
  }
  state.discountAmount =
    Math.round(state.subtotal * state.discount) / 100;
  state.total =
    Math.round(
      (state.subtotal - state.discountAmount) * 100,
    ) / 100;
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<DishType>) => {
      const item = state.list.find(
        (item) => item.id === action.payload.id,
      );
      if (item) item.quantity = (item.quantity ?? 1) + 1;
      else
        state.list.push({...action.payload, quantity: 1});
      recalculate(state);
    },
    removeFromCart: (
      state,
      action: PayloadAction<DishType>,
    ) => {
      const item = state.list.find(
        (item) => item.id === action.payload.id,
      );
      if (item && (item.quantity ?? 1) > 1)
        item.quantity = (item.quantity ?? 1) - 1;
      else
        state.list = state.list.filter(
          (item) => item.id !== action.payload.id,
        );
      recalculate(state);
    },
    deleteFromCart: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.list = state.list.filter(
        (item) => item.id !== action.payload,
      );
      recalculate(state);
    },
    resetCart: () => ({...initialState, list: []}),
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      recalculate(state);
    },
    setPromoCode: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.promoCode = action.payload;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  resetCart,
  setDiscount,
  setPromoCode,
} = cartSlice.actions;
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
