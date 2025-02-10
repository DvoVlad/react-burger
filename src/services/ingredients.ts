import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsEndpoint } from '../utils/endpoints';
import { request } from '../utils/helper';
import { ingredientType } from '../utils/types';
import { SerializedError } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface initialStateIngredients {
  items: ingredientType[];
  error: SerializedError | null;
  loadingStatus: 'loading' | 'idle' | 'failed' | null;
}

export const initialState: initialStateIngredients = {
  items: [],
  error: null,
  loadingStatus: null
};

interface IIngredientsResponse {
  success: boolean;
  data: ingredientType[];
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await request(ingredientsEndpoint);
    const result: IIngredientsResponse = await response.json();
    return result;
  }
);

export const ingredientsSlice = createSlice({
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
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IIngredientsResponse>) => {
        state.items = action.payload.data;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error || true;
        state.items = [];
      });
  },
});

export default ingredientsSlice.reducer;
