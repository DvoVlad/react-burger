import React, { useState, useCallback } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './main-item.module.css';
import { ingredientType } from '../../../utils/types';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function MainItem({ item }) {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const openModal = () => {
    setIsIngredientModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setIsIngredientModalOpen(false);
  }, []);

  return (
    <>
      <article className={styles.item} onClick={openModal}>
        <img src={item.image} alt={item.name} className='ml-4 mr-4' />
        <p className={styles.price + ' text text_type_digits-default mt-1 mb-1'}><span className='mr-2'>{item.price}</span> <CurrencyIcon type="primary"/></p>
        <h3 className={styles.name + ' text text_type_main-default'}>{item.name}</h3>
        <Counter count={1} size="default" />
      </article>
      {
        isIngredientModalOpen && 
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails item={item} />
        </Modal>
      }
    </>
  );
}

MainItem.propTypes = {
  item: ingredientType.isRequired
}

export default MainItem;