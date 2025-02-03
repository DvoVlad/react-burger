import { createSlice } from "@reduxjs/toolkit";
import { IOrderDetail } from "./order";

interface initialStateProps {
  connect: boolean;
  orders: IOrderDetail[];
  error: boolean;
}

const initialState: initialStateProps = {
  connect: false,
  orders: [],
  error: false
}

const historyWebsocketSlice = createSlice({
  name: 'history-websocket',
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
      const data = action.payload;
      state.orders = data.orders;
    },
    error: (state, action) => {
      state.error = true
    }
  }
});

export const connectWebsockedHistoryAction = 'history-websocket/connect';
export const disconnectWebsockedHistoryAction = 'history-websocket/disconnect';

export default historyWebsocketSlice.reducer;