import { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types';
import PropTypes from 'prop-types';
import styles from './constructor-item.module.css'
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveIngredient } from '../../../services/ingredients-constructor';

function ConstructorItem({item, handleClose, index}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'constructorMain',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        dispatch(moveIngredient({dragIndex, hoverIndex}));
        item.index = hoverIndex;
    },
})
  const [{ isDragging }, drag] = useDrag({
    type: 'constructorMain',
    item: { index },
    collect: monitor => ({
        isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div className={`${styles.ingredient} ${isDragging ? styles.isDragging : ''}`} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass="ml-2"
        handleClose={handleClose}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  handleClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default ConstructorItem;