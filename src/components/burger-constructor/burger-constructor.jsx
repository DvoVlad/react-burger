import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
  const firstBurger = data.find((item) => item.type === 'bun');
  const ingredients = data.filter((item) => item.type !== 'bun');
  const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
  const total = ingredientsPrice + firstBurger.price * 2;

  return (
    <section className='mt-25'>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={firstBurger.name}
        price={firstBurger.price}
        thumbnail={firstBurger.image_mobile}
        extraClass="ml-8"
      />
      <ul className={styles.ingredientsList + " mt-4 mb-4"}>
        {ingredients.map((item) => (
          <li key={item._id} className={styles.ingredient}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              extraClass="ml-2"
            />
          </li>
        ))}
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={firstBurger.name}
        price={firstBurger.price}
        thumbnail={firstBurger.image_mobile}
        extraClass="ml-8"
      />
      <div className={styles.totalOrder + " mt-10"}>
        <p className='text text_type_digits-medium mr-10'>{ total } <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemsShape)
}

export default BurgerConstructor;