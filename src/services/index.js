import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import ingredientsConstructorReducer from './ingredients-constructor';
import orderReducer from './order';
import userReducer from './user';

const rootReducer = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    myOrder: orderReducer,
    user: userReducer
  },
  devTools: true
});

export default rootReducer;