import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducer from './ingredients';
import ingredientsConstructorReducer from './ingredients-constructor';
import orderReducer from './order';
import userReducer from './user';
import historyWebsocketReducer from './history-websocket';
import * as historyActions from './history-websocket';
import allWebsocketReducer from './all-websocket';
import * as allActions from './all-websocket';
import {createWebSocketMiddleware} from '../utils/create-websocket-middleware';
import { updateToken } from './user';
import { webSockedHistoryEndpoint } from '../utils/endpoints';
import { TMessageFromSocket } from '../utils/types';
import { UnknownAction } from '@reduxjs/toolkit';

const websocketMiddlewareHistory = createWebSocketMiddleware<TMessageFromSocket, any>(
{
    connect: historyActions.connect,
    disconnect: historyActions.disconnect,
    sendMessage: historyActions.sendMessage,
    onConnected: historyActions.connected,
    onDisconnected: historyActions.disconnected,
    onMessageReceived: historyActions.messageReceived,
    onError: historyActions.error
},
{ 
  withTokenRefresh: true,
},
true,
(dispatch) => {
  const reloadAuthConnect = async () => {
    await dispatch(historyActions.disconnect());
    await dispatch(updateToken() as unknown as UnknownAction);
    dispatch(historyActions.connect(webSockedHistoryEndpoint));
  }
  reloadAuthConnect();
}
);

const websocketMiddlewareAll = createWebSocketMiddleware<TMessageFromSocket, any>(
{
    connect: allActions.connect,
    disconnect: allActions.disconnect,
    sendMessage: allActions.sendMessage,
    onConnected: allActions.connected,
    onDisconnected: allActions.disconnected,
    onMessageReceived: allActions.messageReceived,
    onError: allActions.error
}, { withTokenRefresh: false }, false);

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  myOrder: orderReducer,
  user: userReducer,
  allWebsoket: allWebsocketReducer,
  historyWebsocket: historyWebsocketReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat([websocketMiddlewareHistory, websocketMiddlewareAll])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;