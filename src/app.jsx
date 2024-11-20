import React, { useEffect, useState } from 'react';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { ingredientsEndpoint } from './utils/endpoints';
import styles from './app.module.css';

function App() {
  const [data, setData] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetch(ingredientsEndpoint)
    .then(
     (res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      } 
    )
    .then((ingredients) => {
      setData(ingredients.data)
    })
    .catch((e) => {
      setError(true)
    });
  }, [])

  return (
    <>
      <AppHeader />
      <AppMain>
        {data.length > 0 && !isError && <>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </>}
        {
          isError && <div className={styles.error + " text text_type_main-default mt-5"}>Случилась ошибка получения данных! Перезагрузите сайт!</div>
        }
      </AppMain>
    </>
  );
}

export default App;
