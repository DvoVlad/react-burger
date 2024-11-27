import React, { useState, useCallback } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './sauce-item.module.css';
import { ingredientType } from '../../../utils/types';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { showInModal, deleteFromModal } from '../../../services/showedIngredient';
import { useDrag } from 'react-dnd';
function SauceItem({ item }) {
  const selectedMain = useSelector((store) => store.ingredientsConstructor.items);
  const mainList = selectedMain.filter((element) => item._id === element._id);
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
        {mainList.length > 0 && <Counter count={mainList.length} size="default" />}
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
  item: ingredientType.isRequired
}

export default SauceItem;