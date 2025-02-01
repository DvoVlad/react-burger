import { createSlice } from "@reduxjs/toolkit";
import { IOrderDetail } from "./order";

interface initialStateProps {
  connect: boolean;
  orders: IOrderDetail[];
  error: boolean;
  total: number;
  totalToday: number
}

const initialState: initialStateProps = {
  connect: false,
  orders: [],
  error: false,
  total: 0,
  totalToday: 0
}

const allWebsocketSlice = createSlice({
  name: 'all-websocket',
  initialState,
  reducers: {
    connected: (state, action) => {
      state.connect = true;
      state.error = false;
    },
    disconnected: (state, action) => {
      state.connect = false;
    },
    messageReceived: (state, action) => {
      const data = JSON.parse(action.payload);
      state.orders = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    },
    error: (state, action) => {
      state.error = true
    }
  }
});

export const connectWebsockedAllAction = 'all-websocket/connect';
export const disconnectWebsockedAllAction = 'all-websocket/disconnect';

export default allWebsocketSlice.reducer;