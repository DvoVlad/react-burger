import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderEndpoint } from '../utils/endpoints';
import { request } from '../utils/helper';
import { SerializedError } from '@reduxjs/toolkit';
import { ingredientType } from '../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit'
import { getDetailOrderEndpoint } from '../utils/endpoints';
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

export interface IOrderDetail {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price:number;
  owner?: string;
}

export interface IOrderDetailResponse {
  success: boolean;
  orders: IOrderDetail[]
}

interface initialStateStore {
  data: IOrder | null;
  error: SerializedError | null;
  loadingStatus: 'loading' | 'idle' | 'failed' | null;
  loadingStatusDetail: 'loading' | 'idle' | 'failed' | null;
  detailOrder: null | IOrderDetail;
  detailError: SerializedError | null;
}

const initialState: initialStateStore = {
  data: null,
  error: null,
  loadingStatus: null,
  detailOrder: null,
  loadingStatusDetail: null,
  detailError: null,
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

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id: string) => {
    const response = await request(`${getDetailOrderEndpoint}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    const result: IOrderDetailResponse = await response.json();
    return result.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    resetDetail: (state) => {
      state.detailOrder = null;
      state.loadingStatusDetail = null;
    }
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
      })
      // Вызывается прямо перед выполнением запроса
      .addCase(getOrder.pending, (state) => {
        state.loadingStatusDetail = 'loading';
        state.detailError = null;
      })
      // Вызывается, если запрос успешно выполнился
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<IOrderDetail>) => {
        state.detailOrder = action.payload;
        state.loadingStatusDetail = 'idle';
        state.detailError = null;
      })
      // Вызывается в случае ошибки
      .addCase(getOrder.rejected, (state, action) => {
        state.loadingStatusDetail = 'failed';
        state.detailError = action.error;
        state.detailOrder = null;
      });
  },
});
export const { resetDetail } = orderSlice.actions
export default orderSlice.reducer;