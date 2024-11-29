import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {} };

const showedIngredientSlice = createSlice({
  name: 'showedIngredientSlice',
  initialState,
  reducers: {
    showInModal: (state, action) => {
      state.value = action.payload;
    },
    deleteFromModal: (state) => {
      state.value = {};
    }
  }
});

export const { showInModal, deleteFromModal } = showedIngredientSlice.actions;

export default showedIngredientSlice.reducer;