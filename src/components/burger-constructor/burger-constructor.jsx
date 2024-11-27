import React, { useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun } from '../../services/ingredients-constructor';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [{ isOverTop }, dropBunTop] = useDrop(
    () => ({
      accept: 'bun',
      drop: (item) => {
        dispatch(addBun(item));
      },
      collect: (monitor) => ({
        isOverTop: monitor.isOver(),
      })
    })
  )
  const [{ isOverBottom }, dropBunBottom] = useDrop(
    () => ({
      accept: 'bun',
      drop: (item) => {
        dispatch(addBun(item));
      },
      collect: (monitor) => ({
        isOverBottom: monitor.isOver(),
      })
    })
  )

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
      {burger ? 
      <div ref={dropBunTop}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={burger.name + " (верх)"}
          price={burger.price}
          thumbnail={burger.image_mobile}
          extraClass={`ml-8 ${isOverTop ? styles.burgerDragFieldOver : ''}`}
        />
      </div> :
      <div className={`${styles.burgerDragField} ml-8 constructor-element constructor-element_pos_top ${isOverTop ? styles.burgerDragFieldOver : ''}`} ref={dropBunTop}>
        Перетащите бургер сюда
      </div>
      }
      <ul className={styles.ingredientsList + " mt-4 mb-4"}>
        {
          ingredients.length === 0 && <li key="empty">
            <div className={`${styles.burgerDragField} ml-8 constructor-element`}>
              Перетащите ингредиенты сюда
            </div>
          </li>
        }
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
      {burger ? 
      <div ref={dropBunBottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={burger.name + " (низ)"}
          price={burger.price}
          thumbnail={burger.image_mobile}
          extraClass={`ml-8 ${isOverBottom ? styles.burgerDragFieldOver : ''}`}
        />
      </div> :
      <div className={`${styles.burgerDragField} ml-8 constructor-element constructor-element_pos_bottom ${isOverBottom ? styles.burgerDragFieldOver : ''}`} ref={dropBunBottom}>
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