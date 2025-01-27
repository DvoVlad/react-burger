import { useRef, FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientTypeConstructor } from '../../../utils/types';
import styles from './constructor-item.module.css'
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../services';
import { moveIngredient } from '../../../services/ingredients-constructor';

interface ConstructorItemProps {
  item: ingredientTypeConstructor,
  handleClose: () => void,
  index: number
}

interface IItem {
  index: number
}

const ConstructorItem: FC<ConstructorItemProps> = ({item, handleClose, index}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [, drop] = useDrop({
    accept: 'constructorMain',
    hover(item: IItem, monitor) {
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
        if(clientOffset === null) return;
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

export default ConstructorItem;