import React, { useState, useCallback } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './sauce-item.module.css';
import { ingredientType } from '../../../utils/types';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { showInModal, deleteFromModal } from '../../../services/showedIngredient';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
function SauceItem({ item, counter }) {
  const [{isDragging}, dragSauce] = useDrag(() => ({
    type: 'main',
    item: {...item},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(showInModal(item));
    setIsIngredientModalOpen(true);
  }

  const closeModal = useCallback(() => {
    dispatch(deleteFromModal());
    setIsIngredientModalOpen(false);
  }, [dispatch]);
  
  return (
    <>
      <article className={`${styles.item} ${isDragging ? styles.isDragging : ''}`} onClick={openModal} ref={dragSauce}>
        <img src={item.image} alt={item.name} className='ml-4 mr-4' />
        <p className={styles.price + ' text text_type_digits-default mt-1 mb-1'}><span className='mr-2'>{item.price}</span> <CurrencyIcon type="primary"/></p>
        <h3 className={styles.name + ' text text_type_main-default'}>{item.name}</h3>
        {counter > 0 && <Counter count={counter} size="default" />}
      </article>
      {
        isIngredientModalOpen && 
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      }
    </>
  );
}

SauceItem.propTypes = {
  item: ingredientType.isRequired,
  counter: PropTypes.number.isRequired
}

export default SauceItem;