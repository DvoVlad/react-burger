import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: null
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    updateNumber: (state, payload) => {
      state.number = payload;
    }
  }
});

export const { updateNumber } = orderSlice.actions;

export default orderSlice.reducer;