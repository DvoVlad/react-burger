import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../services';
import { updateToken } from '../services/user';

type WebSocketMiddlewareOptions = {
  url: string;
  actions: {
    connect: string;
    disconnect: string;
    sendMessage: string;
    onConnected: string;
    onDisconnected: string;
    onMessageReceived: string;
    onError: string;
  };
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
}

function createWebSocketMiddleware (options: WebSocketMiddlewareOptions, updateTokenOnError:boolean = false, auth = false): Middleware {
  let socket: WebSocket | null = null;

  return ((store: MiddlewareAPI<AppDispatch, RootState>) => (next: Dispatch) => (action: AnyAction) => {
    const { actions } = options;

    switch (action.type) {
      case actions.connect: {
        if (socket !== null) {
          console.warn('WebSocket is already connected.');
          return;
        }

        if(auth) {
          socket = new WebSocket(`${options.url}?token=${localStorage.getItem('accessToken')}`);
        } else {
          socket = new WebSocket(`${options.url}`);
        }

        socket.onopen = (event) => {
          options.onOpen?.(event);
          store.dispatch({ type: actions.onConnected });
        };

        socket.onclose = (event) => {
          options.onClose?.(event);
          store.dispatch({ type: actions.onDisconnected, payload: event.type });
          socket = null;
        };

        socket.onmessage = (event) => {
          options.onMessage?.(event);
          const data = JSON.parse(event.data);
          if(updateTokenOnError && data.message === 'Invalid or missing token' ) {
            const reloadConnect = async () => {
              await store.dispatch({
                type: actions.disconnect
              });
              await store.dispatch(updateToken());
              store.dispatch({type: actions.connect});
            }
            //reloadConnect();
            return;
          }
          store.dispatch({ type: actions.onMessageReceived, payload: event.data });
        };

        socket.onerror = (event) => {
          options.onError?.(event);
          store.dispatch({ type: actions.onError, payload: event.type });
        };

        break;
      }

      case actions.disconnect: {
        console.log('SOCKET DISCONNECT');
        console.log(socket);
        if (socket !== null) {
          console.log('SOCKET CLOSE!');
          socket.close();
        }
        socket = null;
        break;
      }

      case actions.sendMessage: {
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(action.payload);
        } else {
          console.warn('WebSocket is not open. Cannot send message.');
        }
        break;
      }

      default:
        break;
    }

    next(action);
  }) as Middleware;
};

export default createWebSocketMiddleware;