import React, { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import BunItem from './bun-item/bun-item';
import SauceItem from './sauce-item/sauce-item';
import MainItem from './main-item/main-item';
import { ingredientType } from '../../utils/types';

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState('Булки')
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  useEffect(() => {
    if(current === 'Булки'){
      bunRef.current.scrollIntoView(true);
    }
    if(current === 'Соусы'){
      sauceRef.current.scrollIntoView(true);
    }
    if(current === 'Начинки'){
      mainRef.current.scrollIntoView(true);
    }
  }, [current]);
  const buns = data.filter((item) => item.type === 'bun');
  const sauce = data.filter((item) => item.type === 'sauce');
  const main = data.filter((item) => item.type === 'main');
  const tabs = [
    {
      id: 1,
      name: 'Булки'
    },
    {
      id: 2,
      name: 'Соусы'
    },
    {
      id: 3,
      name: 'Начинки'
    }
  ];

  return (
    <section>
      <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>
      <ul className={styles.tabs + " mb-10"}>
        {tabs.map((item) => (
          <li key={item.id}>
            <Tab value={item.name} active={current === item.name} onClick={setCurrent}>
              {item.name}
            </Tab>
          </li>
        ))}
      </ul>
      <div className={styles.ingredients}>
        <h2 ref={bunRef} className='text text_type_main-medium'>Булки</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6 mb-10'}>
          {buns.map((item => (
            <li key={item._id}>
              <BunItem item={item}/>
            </li>
          )))}
        </ul>
        <h2 ref={sauceRef} className='text text_type_main-medium'>Соусы</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6 mb-10'}>
          {sauce.map((item => (
            <li key={item._id}>
              <SauceItem item={item}/>
            </li>
          )))}
        </ul>
        <h2 ref={mainRef} className='text text_type_main-medium'>Начинки</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6'}>
          {main.map((item => (
            <li key={item._id}>
              <MainItem item={item}/>
            </li>
          )))}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}

export default BurgerIngredients;