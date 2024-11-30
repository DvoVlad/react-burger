import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderEndpoint } from '../utils/endpoints';
import { checkResponce } from '../utils/helper';

const initialState = {
  data: null,
  error: null,
  loadingStatus: null
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (ingredientsList) => {
    const response = await fetch(sendOrderEndpoint, {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsList }),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
    checkResponce(response);
    const result = await response.json();
    return result;
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(sendOrder.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(sendOrder.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.data = null;
      });
  },
});

export default orderSlice.reducer;