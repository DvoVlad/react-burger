import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    },
    addMain: (state, action) => {
      const item = {...action.payload, uuid: uuidv4()}
      state.items = [...state.items, item];
    },
    deleteMain: (state, action) => {
      state.items = [...state.items].filter(item => item.uuid !== action.payload);
    }
  }
});

export const { addBun, addMain, deleteMain } = ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;