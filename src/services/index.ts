import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducer from './ingredients';
import ingredientsConstructorReducer from './ingredients-constructor';
import orderReducer from './order';
import userReducer from './user';
import historyWebsocketReducer from './history-websocket';
import createWebSocketMiddleware from '../utils/create-websocket-middleware';

const websocketMiddlewareHistory = createWebSocketMiddleware({
  url: `wss://norma.nomoreparties.space/orders`,
  //url: `wss://norma.nomoreparties.space/orders/all`,
  actions: {
    connect: 'history-websocket/connect',
    disconnect: 'history-websocket/disconnect',
    sendMessage: 'WEBSOCKET/SEND_MESSAGE',
    onConnected: 'history-websocket/connected',
    onDisconnected: 'history-websocket/disconnected',
    onMessageReceived: 'history-websocket/messageReceived',
    onError: 'history-websocket/error',
  },
}, true, true);

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    myOrder: orderReducer,
    user: userReducer,
    historyWebsocket: historyWebsocketReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddlewareHistory)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;