import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const showedIngredientSlice = createSlice({
  name: 'showedIngredientSlice',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    showInModal: (state, payload) => {
      state = payload;
    },
    deleteFromModal: (state) => {
      state = {};
    }
  }
});

export const { showInModal, deleteFromModal } = showedIngredientSlice.actions;

export default showedIngredientSlice.reducer;