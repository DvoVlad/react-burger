import { createSlice } from "@reduxjs/toolkit";
import { IOrderDetail } from "./order";
import { PayloadAction } from "@reduxjs/toolkit";
import { TMessageFromSocket } from "../utils/types";
interface initialStateProps {
  status: 'connecting' | 'disconnecting' | 'connected' | 'disconnected' | null;
  orders: IOrderDetail[];
  error: Event | null;
}

const initialState: initialStateProps = {
  status: null,
  orders: [],
  error: null
}

const historyWebsocketSlice = createSlice({
  name: 'history-websocket',
  initialState,
  reducers: {
    connect: (state, payload: PayloadAction<string>) => {
      state.status = 'connecting';
    },
    disconnect: (state) => {
      state.status = 'disconnecting';
    },
    sendMessage: (state, action) => {

    },
    connected: (state, action: PayloadAction<Event>) => {
      state.status = 'connected';
      state.error = null;
    },
    disconnected: (state, action: PayloadAction<CloseEvent>) => {
      state.status = 'disconnected';
    },
    messageReceived: (state, action: PayloadAction<TMessageFromSocket>) => {
      const data = action.payload;
      state.orders = data.orders;
    },
    error: (state, action: PayloadAction<Event>) => {
      state.error = action.payload;
    }
  }
});

export const { connect, disconnect, sendMessage, connected, disconnected, messageReceived, error } = historyWebsocketSlice.actions

export default historyWebsocketSlice.reducer;