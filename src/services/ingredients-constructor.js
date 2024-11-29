import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bun: null,
  items: []
};

const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
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
    },
    moveIngredient: (state, action) => {
      const ingredients = [...state.items];
      const toIndex = action.payload.dragIndex;
      const fromIndex = action.payload.hoverIndex;
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      state.items = ingredients;
    },
    resetIgredients: (state) => {
      state.items = [];
      state.bun = null;
    }
  }
});

export const { addBun, addMain, deleteMain, moveIngredient, resetIgredients } = ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;