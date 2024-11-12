import React from 'react';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import data from './utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <AppMain>
        <BurgerIngredients data={data}/>
        <div>2</div>
      </AppMain>
    </>
  );
}

export default App;
