import React, { useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';

function BurgerConstructor({ data }) {
  const firstBurger = data.find((item) => item.type === 'bun');
  const ingredients = data.filter((item) => item.type !== 'bun');
  const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
  const total = ingredientsPrice + firstBurger.price * 2;

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const onOpenOrder = () => {
    setIsOrderModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setIsOrderModalOpen(false);
  }, [])

  return (
    <section className='mt-25'>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={firstBurger.name + " (верх)"}
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
        text={firstBurger.name + " (низ)"}
        price={firstBurger.price}
        thumbnail={firstBurger.image_mobile}
        extraClass="ml-8"
      />
      <div className={styles.totalOrder + " mt-10"}>
        <p className='text text_type_digits-medium mr-10'>{ total } <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={onOpenOrder}>
          Оформить заказ
        </Button>
      </div>
      {
        isOrderModalOpen && 
        <Modal onClose={closeModal}>
          <OrderDetails orderId="034536"/>
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}

export default BurgerConstructor;