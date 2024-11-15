import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './sauce-item.module.css';
import { ingredientType } from '../../../utils/types';

function SauceItem({ item }) {
  return (
    <article className={styles.item}>
      <img src={item.image} alt={item.name} className='ml-4 mr-4' />
      <p className={styles.price + ' text text_type_digits-default mt-1 mb-1'}><span className='mr-2'>{item.price}</span> <CurrencyIcon type="primary"/></p>
      <h3 className={styles.name + ' text text_type_main-default'}>{item.name}</h3>
      <Counter count={1} size="default" />
    </article>
  );
}

SauceItem.propTypes = {
  item: ingredientType.isRequired
}

export default SauceItem;