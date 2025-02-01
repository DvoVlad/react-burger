import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducer from './ingredients';
import ingredientsConstructorReducer from './ingredients-constructor';
import orderReducer from './order';
import userReducer from './user';
import historyWebsocketReducer from './history-websocket';
import allWebsocketReducer from './all-websocket';
import createWebSocketMiddleware from '../utils/create-websocket-middleware';
import { connectWebsockedAllAction, disconnectWebsockedAllAction } from './all-websocket';
import { connectWebsockedHistoryAction, disconnectWebsockedHistoryAction } from './history-websocket';

const websocketMiddlewareHistory = createWebSocketMiddleware({
  actions: {
    connect: connectWebsockedHistoryAction,
    disconnect: disconnectWebsockedHistoryAction,
    sendMessage: 'history-websocket/sendMessage',
    onConnected: 'history-websocket/connected',
    onDisconnected: 'history-websocket/disconnected',
    onMessageReceived: 'history-websocket/messageReceived',
    onError: 'history-websocket/error',
  },
}, true, true);

const websocketMiddlewareAll = createWebSocketMiddleware({
  actions: {
    connect: connectWebsockedAllAction,
    disconnect: disconnectWebsockedAllAction,
    sendMessage: 'all-websocket/sendMessage',
    onConnected: 'all-websocket/connected',
    onDisconnected: 'all-websocket/disconnected',
    onMessageReceived: 'all-websocket/messageReceived',
    onError: 'all-websocket/error',
  },
}, false, false);

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    myOrder: orderReducer,
    user: userReducer,
    allWebsoket: allWebsocketReducer,
    historyWebsocket: historyWebsocketReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([websocketMiddlewareHistory, websocketMiddlewareAll])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;