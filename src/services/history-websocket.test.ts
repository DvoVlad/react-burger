import { historyWebsocketSlice } from "./history-websocket";
import { initialState } from "./history-websocket";
import { connect, disconnect, connected, disconnected, messageReceived, error } from "./history-websocket";

describe('history websocket reducer', () => {
  it('initializes correctly', () => {
    const state = historyWebsocketSlice.reducer(undefined, {type: ""});
    expect(state).toEqual(initialState);
  });
});
describe('history websocket actions', () => {
  it('connect', () => {
    const state = historyWebsocketSlice.reducer(initialState, {type: connect.type});
    expect(state).toEqual({...initialState, status: 'connecting'});
  });
  it('disconnect', () => {
    const state = historyWebsocketSlice.reducer(initialState, {type: disconnect.type});
    expect(state).toEqual({...initialState, status: 'disconnecting'});
  });
  it('connected', () => {
    const state = historyWebsocketSlice.reducer(initialState, {type: connected.type});
    expect(state).toEqual({...initialState, status: 'connected'});
  });
  it('disconnected', () => {
    const state = historyWebsocketSlice.reducer(initialState, {type: disconnected.type});
    expect(state).toEqual({...initialState, status: 'disconnected'});
  });
  it('messageReceived', () => {
    const testMessageResponse = {
      success: true,
      orders: [
        {
          _id: "67ab4c2a133acd001be50376",
          ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093f",
            "643d69a5c3f7b9001cfa093c"
          ],
          status: "done",
          name: "Краторный бессмертный бургер",
          createdAt: "2025-02-11T13:10:02.555Z",
          updatedAt: "2025-02-11T13:10:03.219Z",
          number: 68164
        }
      ],
      total:67790,
      totalToday:50
    }
    const state = historyWebsocketSlice.reducer(initialState, {type: messageReceived.type, payload: testMessageResponse});
    expect(state).toEqual({...initialState, orders: [
      {
        _id: "67ab4c2a133acd001be50376",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093f",
          "643d69a5c3f7b9001cfa093c"
        ],
        status: "done",
        name: "Краторный бессмертный бургер",
        createdAt: "2025-02-11T13:10:02.555Z",
        updatedAt: "2025-02-11T13:10:03.219Z",
        number: 68164
      }
    ]});
  })
  it('error', () => {
    const testError = new Event('error');
    const state = historyWebsocketSlice.reducer(initialState, {type: error.type, payload: testError});
    expect(state).toEqual({...initialState, error: testError});
  });
});