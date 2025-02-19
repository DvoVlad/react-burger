import { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './bun-item.module.css';
import { ingredientType } from '../../../utils/types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

interface BunItemProps {
  item: ingredientType,
  counter: number
}

const BunItem: FC<BunItemProps> = ({ item, counter }) => {
  const [{isDragging}, dragBun] = useDrag(() => ({
    type: 'bun',
    item: item,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const location = useLocation();

  return (
    <Link data-test="bun" to={`/ingredients/${item._id}`} state={{ background: location }} className={`${styles.link}`} ref={dragBun}>
      <article className={`${styles.item} ${isDragging ? styles.isDragging : ''}`}>
        <img src={item.image} alt={item.name} className='ml-4 mr-4' />
        <p className={styles.price + ' text text_type_digits-default mt-1 mb-1'}><span className='mr-2'>{item.price}</span> <CurrencyIcon type="primary"/></p>
        <h3 className={styles.name + ' text text_type_main-default'}>{item.name}</h3>
        {counter > 0 && <Counter count={counter} size="default" />}
      </article>
    </Link>
  );
}

export default BunItem;