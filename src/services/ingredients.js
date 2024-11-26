import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsEndpoint } from '../utils/endpoints';

const initialState = {
  items: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngedients', // Id отображается в dev tools и должен быть уникальный у каждого thunk
  async () => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch(ingredientsEndpoint, { signal });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const result = await response.json();
      controller.abort();
      return result;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.log(err)
      }
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
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
        state.items = action.data;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default ingredientsSlice.reducer;
