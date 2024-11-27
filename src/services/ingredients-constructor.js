import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  items: []
};

const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    }
  }
});

export const { addBun } = ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;