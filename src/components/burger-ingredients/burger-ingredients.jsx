import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import BunItem from './bun-item/bun-item';
import SauceItem from './sauce-item/sauce-item';
import MainItem from './main-item/main-item';
import { useSelector } from 'react-redux';
import { ingredientType } from '../../utils/types';

function BurgerIngredients() {
  const data = useSelector((store) => store.ingredients.items);
  const selectedItems = useSelector((store) => store.ingredientsConstructor.items);
  const selectedBun = useSelector((store) => store.ingredientsConstructor.bun);
  const ingredientsCounters = useMemo(()=> {
    let result = {}
    selectedItems.forEach(item => {
      result[item._id] = result[item._id] ? result[item._id] + 1 : 1;
    });
    if(selectedBun) {
      result[selectedBun._id] = 2;
    }
    return result;
  }, [selectedItems, selectedBun]);

  const [current, setCurrent] = useState('Булки')
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  let isScroll = useRef(false);
  const tabRef = useRef(null)
  const tabClick = (value) => {
    setCurrent(value);
    isScroll.current = true;
  }
  useEffect(() => {
    if(isScroll.current) {
      if(current === 'Булки'){
        bunRef.current.scrollIntoView(true);
      }
      if(current === 'Соусы'){
        sauceRef.current.scrollIntoView(true);
      }
      if(current === 'Начинки'){
        mainRef.current.scrollIntoView(true);
      }
      isScroll.current = false;
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

  const onScroll = () => {
    const bunY = Math.abs(bunRef.current.getBoundingClientRect().y - tabRef.current.getBoundingClientRect().y);
    const sauceY = Math.abs(sauceRef.current.getBoundingClientRect().y - tabRef.current.getBoundingClientRect().y);
    const mainY = Math.abs(mainRef.current.getBoundingClientRect().y - tabRef.current.getBoundingClientRect().y);
    if(bunY < sauceY && bunY < mainY) {
      setCurrent('Булки');
    } 
    if(sauceY < bunY && sauceY < mainY) {
      setCurrent('Соусы');
    }
    if(mainY < bunY && mainY < sauceY) {
      setCurrent('Начинки');
    }
  }

  return (
    <section>
      <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>
      <ul className={styles.tabs + " mb-10"} ref={tabRef}>
        {tabs.map((item) => (
          <li key={item.id}>
            <Tab value={item.name} active={current === item.name} onClick={tabClick}>
              {item.name}
            </Tab>
          </li>
        ))}
      </ul>
      <div className={styles.ingredients} onScroll={onScroll}>
        <h2 ref={bunRef} className='text text_type_main-medium'>Булки</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6 mb-10'}>
          {buns.map((item => (
            <li key={item._id}>
              <BunItem item={item} counter={ingredientsCounters[item._id] ?? 0}/>
            </li>
          )))}
        </ul>
        <h2 ref={sauceRef} className='text text_type_main-medium'>Соусы</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6 mb-10'}>
          {sauce.map((item => (
            <li key={item._id}>
              <SauceItem item={item} counter={ingredientsCounters[item._id] ?? 0}/>
            </li>
          )))}
        </ul>
        <h2 ref={mainRef} className='text text_type_main-medium'>Начинки</h2>
        <ul className={styles.itemList + ' pl-4 pr-2 mt-6'}>
          {main.map((item => (
            <li key={item._id}>
              <MainItem item={item} counter={ingredientsCounters[item._id] ?? 0}/>
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