import React, { useEffect, useRef } from 'react';
import AppHeader from './components/app-header/app-header';
import AppMain from './components/app-main/app-main';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from './services/ingredients';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const isError = useSelector((store) => store.ingredients.error);
  const loadingStatus = useSelector((store) => store.ingredients.loadingStatus);
  const dispatch = useDispatch();
  let isDispatched = useRef(false);
  useEffect(() => {
    if(isDispatched.current) {
      return
    }
    dispatch(fetchIngredients());
    return () => {
      isDispatched.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <AppMain>
        {loadingStatus === 'idle' && <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>}
        {
          loadingStatus === 'failed' && <div className={styles.error + " text text_type_main-default mt-5"}>Случилась ошибка получения данных! Перезагрузите сайт!{isError.message}</div>
        }
      </AppMain>
    </>
  );
}

export default App;
