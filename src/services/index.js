import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import ingredientsConstructorReducer from './ingredients-constructor';
import showedIngredientReducer from './showedIngredient';
import orderReducer from './order';

const rootReducer = configureStore({
  reducer: {
    // Свойство ingradients будет внутри объекта общего состояния: state.ingradients
    ingredients: ingredientsReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    showedIngredient: showedIngredientReducer,
    order: orderReducer
  },
  devTools: true
});

export default rootReducer;