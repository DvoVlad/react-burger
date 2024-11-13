import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './sauce-item.module.css';
import PropTypes from 'prop-types';

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

const itemsShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

SauceItem.propTypes = {
  item: itemsShape
}

export default SauceItem;