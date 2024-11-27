import React, { useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { useSelector } from 'react-redux';

function BurgerConstructor() {
  const burger = useSelector((store) => store.ingredientsConstructor.bun);
  const ingredients = useSelector((store) => store.ingredientsConstructor.items);
  const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
  const total = ingredientsPrice + (burger === null ? 0 : burger.price) * 2;

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const onOpenOrder = () => {
    setIsOrderModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setIsOrderModalOpen(false);
  }, [])

  return (
    <section className='mt-25'>
      {burger ? <ConstructorElement
        type="top"
        isLocked={true}
        text={burger.name + " (верх)"}
        price={burger.price}
        thumbnail={burger.image_mobile}
        extraClass="ml-8"
      /> :
      <div className={`${styles.burgerDragField} constructor-element constructor-element_pos_top`}>
        Перетащите бургер сюда
      </div>
      }
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
      {burger ? <ConstructorElement
        type="bottom"
        isLocked={true}
        text={burger.name + " (низ)"}
        price={burger.price}
        thumbnail={burger.image_mobile}
        extraClass="ml-8"
      /> :
      <div className={`${styles.burgerDragField} constructor-element constructor-element_pos_bottom`}>
        Перетащите бургер сюда
      </div> 
      }
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

export default BurgerConstructor;