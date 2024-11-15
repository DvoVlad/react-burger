import React from 'react';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <AppMain>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </AppMain>
    </>
  );
}

export default App;
