import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './bun-item.module.css';
import { ingredientType } from '../../../utils/types';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BunItem({ item }) {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const openModal = () => {
    setIsIngredientModalOpen(true);
  }

  const closeModal = () => {
    setIsIngredientModalOpen(false);
  }

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
        <Modal onClose={closeModal}>
          <IngredientDetails item={item} />
        </Modal>
      }
    </>
  );
}

BunItem.propTypes = {
  item: ingredientType.isRequired
}

export default BunItem;