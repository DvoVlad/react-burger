import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderEndpoint } from '../utils/endpoints';
import { request } from '../utils/helper';
import { SerializedError } from '@reduxjs/toolkit';
import { ingredientType } from '../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit'
interface IOrder {
  success: boolean;
  name: string;
  order: {
    _id: string;
    ingredients: ingredientType[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price:number;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}

interface initialStateStore {
  data: IOrder | null;
  error: SerializedError | null;
  loadingStatus: 'loading' | 'idle' | 'failed' | null;
}

const initialState: initialStateStore = {
  data: null,
  error: null,
  loadingStatus: null
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (ingredientsList: string[]) => {
    const response = await request(sendOrderEndpoint, {
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsList }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization" : "Bearer " + localStorage.getItem("accessToken")
      }
    });
    const result: IOrder = await response.json();
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
      .addCase(sendOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
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