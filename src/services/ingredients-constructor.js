import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  items: []
};

const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {}
});

export default ingredientsConstructorSlice.reducer;