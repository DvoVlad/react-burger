import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
  const firstBurger = data.find((item) => item.type === 'bun');
  const ingredients = data.filter((item) => item.type !== 'bun');

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
          <li className={styles.ingredient}>
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