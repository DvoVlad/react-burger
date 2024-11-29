import React from 'react';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <>
      <AppHeader />
      <AppMain>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </AppMain>
    </>
  );
}

export default App;
