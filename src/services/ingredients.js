import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsEndpoint } from '../utils/endpoints';

const initialState = {
  items: [],
  error: null,
  loadingStatus: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngedients',
  async () => {
    const response = await fetch(ingredientsEndpoint);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(fetchIngredients.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.items = [];
      });
  },
});

export default ingredientsSlice.reducer;
