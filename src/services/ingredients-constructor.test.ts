import { initialState } from "./ingredients-constructor";
import { ingredientsConstructorSlice } from "./ingredients-constructor";
import { addBun, addMain, deleteMain, moveIngredient, resetIgredients } from "./ingredients-constructor";

describe('ingredients constructor reducer', () => {
  it('initializes correctly', () => {
    const state = ingredientsConstructorSlice.reducer(undefined, {type: ""});
    expect(state).toEqual(initialState);
  });
});

describe('ingredients constructor actions', () => {
  it('addBun', () => {
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
    const state = ingredientsConstructorSlice.reducer(initialState, {type: addBun.type, payload: addedItem});
    expect(state).toEqual({...initialState, bun: addedItem});
  });
  it('addMain', () => {
    const addedMain = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0
    }
    const state = ingredientsConstructorSlice.reducer(initialState, {type: addMain.type, payload: addedMain});
    expect(state).toEqual({...initialState, items: [addedMain]});
  });
  it('deleteMain', () => {
    const addedMain1 = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
      uuid: 'sdfdsafadsadgdfghdfgdsf'
    };
    const addedMain2 = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
      uuid: 'sdfdsafadsadgdfghdfgmmm'
    };
    const initialState = {
      bun: null,
      items: [addedMain1, addedMain2]
    };
    const state = ingredientsConstructorSlice.reducer(initialState, {type: deleteMain.type, payload: addedMain2.uuid});
    expect(state).toEqual({...initialState, items: [addedMain1]});
  });
  it('moveIngredient', () => {
    const addedMain1 = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
      uuid: 'sdfdsafadsadgdfghdfgdsf'
    };
    const addedMain2 = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
      uuid: 'sdfdsafadsadgdfghdfgmmm'
    };
    const initialState = {
      bun: null,
      items: [addedMain1, addedMain2]
    };
    const moveObj = {
      dragIndex: 0,
      hoverIndex: 1
    }
    const state = ingredientsConstructorSlice.reducer(initialState, {type: moveIngredient.type, payload: moveObj});
    expect(state).toEqual({...initialState, items: [addedMain2, addedMain1]});
  });
  it('resetIgredients', () => {
    const state = ingredientsConstructorSlice.reducer(initialState, {type: resetIgredients.type});
    expect(state).toEqual({...initialState, items: [], bun: null});
  });
});