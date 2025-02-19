import { initialState } from "./order";
import { orderSlice } from "./order";
import { sendOrder, getOrder, resetDetail } from "./order";

describe('order reducer', () => {
  it('initializes correctly', () => {
    const state = orderSlice.reducer(undefined, {type: ""});
    expect(state).toEqual(initialState);
  });
});

describe('sendOrder async action', () => {
  it('fulfilled', () => {
      const createdOrder = {
        success:true,
        name:"Краторный spicy бургер",
        order: {
          ingredients: [
            {
              _id:"643d69a5c3f7b9001cfa093c",
              name:"Краторная булка N-200i",
              type:"bun",
              proteins:80,
              fat:24,
              carbohydrates:53,
              calories:420,
              price:1255,
              image:"https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v:0
            },
            {
              _id:"643d69a5c3f7b9001cfa0942",
              name:"Соус Spicy-X",
              type:"sauce",
              proteins:30,
              fat:20,
              carbohydrates:40,
              calories:30,
              price:90,
              image:"https://code.s3.yandex.net/react/code/sauce-02.png",
              image_mobile:"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
              image_large:"https://code.s3.yandex.net/react/code/sauce-02-large.png",
              __v:0
            },
            {
              _id:"643d69a5c3f7b9001cfa093c",
              name:"Краторная булка N-200i",
              type:"bun",
              proteins:80,
              fat:24,
              carbohydrates:53,
              calories:420,
              price:1255,
              image:"https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v:0
            }
          ],
          _id:"67aa1670133acd001be50095",
          owner: {
            name: "Владислав Дворянинов",
            email: "dvovlad@mail.ru",
            createdAt: "2024-12-13T14:36:34.385Z",
            updatedAt: "2025-02-05T14:43:44.230Z"
          },
          createdAt: "2025-02-10T15:08:32.592Z",
          updatedAt: "2025-02-10T15:08:33.260Z",
          number: 68118,
          price: 2600
        }
      };

      const state = orderSlice.reducer(initialState, {type: sendOrder.fulfilled.type, payload: createdOrder});

      expect(state).toEqual({...initialState, data: createdOrder, loadingStatus: 'idle', error: null});
    });
    it('pending', () => {
      const state = orderSlice.reducer(initialState, {type: sendOrder.pending.type});

      expect(state).toEqual({...initialState, loadingStatus: 'loading', error: null});
    });
    it('rejected', () => {
      const testErrpr = new Error('testError');

      const state = orderSlice.reducer(initialState, {type: sendOrder.rejected.type, error: testErrpr});

      expect(state).toEqual({...initialState, loadingStatus: 'failed', data: null, error: testErrpr});
    });
});
describe('getOrder async action', () => {
  it('fulfilled', () => {
    const order = {
      _id: "679b6221133acd001be4d777",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093d"
      ],
      owner: "675c4672750864001d371042",
      status: "done",
      name: "Флюоресцентный био-марсианский антарианский бургер",
      createdAt: "2025-01-30T11:27:29.926Z",
      updatedAt: "2025-01-30T11:27:30.602Z",
      number: 67209,
      __v: 0
    };

    const state = orderSlice.reducer(initialState, {type: getOrder.fulfilled.type, payload: order});

    expect(state).toEqual({...initialState, detailOrder: order, loadingStatusDetail: 'idle', detailError: null});
  });
  it('pending', () => {
    const state = orderSlice.reducer(initialState, {type: getOrder.pending.type});

    expect(state).toEqual({...initialState, loadingStatusDetail: 'loading', detailError: null});
  })
  it('rejected', () => {
    const testErrpr = new Error('testError');

    const state = orderSlice.reducer(initialState, {type: getOrder.rejected.type, error: testErrpr});

    expect(state).toEqual({...initialState, loadingStatusDetail: 'failed', detailOrder: null, detailError: testErrpr});
  });
});

describe('reset detail order', () => {
  const order = {
    _id: "679b6221133acd001be4d777",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0945",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093d"
    ],
    owner: "675c4672750864001d371042",
    status: "done",
    name: "Флюоресцентный био-марсианский антарианский бургер",
    createdAt: "2025-01-30T11:27:29.926Z",
    updatedAt: "2025-01-30T11:27:30.602Z",
    number: 67209,
    __v: 0
  };
  const copyInitialState = {...initialState};
  copyInitialState.loadingStatusDetail = 'idle';
  copyInitialState.detailOrder = order;

  const state = orderSlice.reducer(copyInitialState, {type: resetDetail.type});
  
  expect(state).toEqual({...copyInitialState, loadingStatusDetail: null, detailOrder: null});
});