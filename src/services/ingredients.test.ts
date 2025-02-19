import { initialState } from "./ingredients";
import { ingredientsSlice } from "./ingredients";
import { fetchIngredients } from "./ingredients";

describe('ingredients reducer', () => {
  it('initializes correctly', () => {
    const state = ingredientsSlice.reducer(undefined, {type: ""});

    expect(state).toEqual(initialState);
  });
});

describe('ingredients async actions', () => {
  it('fulfilled', () => {
    const addedItem = {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    }
    const testData = {
      data: [
        addedItem
      ]
    }

    const state = ingredientsSlice.reducer(initialState, {type: fetchIngredients.fulfilled.type, payload: testData});

    expect(state).toEqual({...initialState, items:[addedItem], loadingStatus: 'idle'});
  });
  it('pending', () => {
    const state = ingredientsSlice.reducer(initialState, {type: fetchIngredients.pending.type});

    expect(state).toEqual({...initialState, loadingStatus: 'loading'});
  });
  it('rejected', () => {
    const testError = new Error('testError');

    const state = ingredientsSlice.reducer(initialState, {type: fetchIngredients.rejected.type, error: testError});

    expect(state).toEqual({...initialState, loadingStatus: 'failed', items: [], error: testError});
  });
});