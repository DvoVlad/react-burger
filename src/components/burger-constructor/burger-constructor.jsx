import React, { useState, useCallback, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addMain, deleteMain, resetIgredients } from '../../services/ingredients-constructor';
import ConstructorItem from './constructor-item/constructor-item';
import { sendOrder } from '../../services/order';
import { Navigate } from 'react-router-dom';

function BurgerConstructor() {
  const [isError, setIsError] = useState(false);
  const sendError = useSelector((store) => store.myOrder.error);
  const userData = useSelector((store) => store.user.userData);
  const [isRedirect , setIsRedirect] = useState(false);

  const dispatch = useDispatch();

  const deleteMainItem = (uuid) => {
    dispatch(deleteMain(uuid));
  }

  const [{ isOverMain }, dropMain] = useDrop(
    () => ({
      accept: 'main',
      drop: (item) => {
        dispatch(addMain(item));
      },
      collect: (monitor) => ({
        isOverMain: monitor.isOver(),
      })
    })
  )
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
  const total = useMemo(() => {
    const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
    return ingredientsPrice + (burger === null ? 0 : burger.price) * 2;
  }, [ingredients, burger]);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const onOpenOrder = () => {
    if(!burger || ingredients.length === 0) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }
    if(userData === null) {
      setIsRedirect(true);
      return
    }
    let result = [];
    ingredients.forEach((item) => {
      result.push(item._id);
    })
    result = [burger._id, ...result, burger._id];
    dispatch(sendOrder(result));
    dispatch(resetIgredients());
    setIsOrderModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setIsOrderModalOpen(false);
  }, [])

  return (
    <section className='mt-25'>
      {isRedirect && <Navigate to="/login" replace />}
      {isError && <p className={`${styles.errorMessage} text text_type_main-default mb-5 ml-10 p-5`}>Вы не выбрали бургер или начинку!</p>}
      {sendError && <p className={`${styles.errorMessage} text text_type_main-default mb-5 ml-10 p-5`}>Ваш заказ не отправился! Попробуйте ещё раз!</p>}
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
      <ul className={`${styles.ingredientsList} ${isOverMain ? styles.burgerDragFieldOver : ''} ${ingredients.length === 0 ? styles.shortList : ''} mt-4 mb-4`} ref={dropMain}>
        {
          ingredients.length === 0 && <li key="empty">
            <div className={`${styles.burgerDragField} ml-8 constructor-element`}>
              Перетащите ингредиенты сюда
            </div>
          </li>
        }
        {ingredients.map((item, index) => (
          <li key={item.uuid}>
            <ConstructorItem item={item} handleClose={() => deleteMainItem(item.uuid)} index={index}/>
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
        isOrderModalOpen && !isError && !sendError &&
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;