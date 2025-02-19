import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ingredientTypeConstructor, ingredientType} from '../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit'

interface initialStateStore {
  bun: ingredientType | null;
  items: ingredientTypeConstructor[];
}

interface IMoveAction {
  dragIndex: number;
  hoverIndex: number;
}

export const initialState: initialStateStore = {
  bun: null,
  items: []
};

export const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<ingredientType>) => {
      state.bun = action.payload;
    },
    addMain: {
      reducer: (state, action: PayloadAction<ingredientTypeConstructor>) => {
        const item = action.payload;
        state.items = [...state.items, item];
      },
      prepare: (item: ingredientType) => {
        const uuid: string = uuidv4();
        return { payload: { ...item, uuid } }
      },
    },
    deleteMain: (state, action: PayloadAction<string>) => {
      state.items = [...state.items].filter(item => item.uuid !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<IMoveAction>) => {
      const ingredients = [...state.items];
      const toIndex = action.payload.dragIndex;
      const fromIndex = action.payload.hoverIndex;
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      state.items = ingredients;
    },
    resetIgredients: (state) => {
      state.items = [];
      state.bun = null;
    }
  }
});

export const { addBun, addMain, deleteMain, moveIngredient, resetIgredients } = ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;