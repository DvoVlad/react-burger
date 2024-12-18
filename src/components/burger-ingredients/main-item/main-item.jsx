import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './main-item.module.css';
import { ingredientType } from '../../../utils/types';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
function MainItem({ item, counter }) {
  const [{isDragging}, dragMain] = useDrag(() => ({
    type: 'main',
    item: {...item},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const location = useLocation();

  return (
    <Link to={`/ingredients/${item._id}`} state={{ background: location }} className={`${styles.link}`} ref={dragMain}>
      <article className={`${styles.item} ${isDragging ? styles.isDragging : ''}`}>
        <img src={item.image} alt={item.name} className='ml-4 mr-4' />
        <p className={styles.price + ' text text_type_digits-default mt-1 mb-1'}><span className='mr-2'>{item.price}</span> <CurrencyIcon type="primary"/></p>
        <h3 className={styles.name + ' text text_type_main-default'}>{item.name}</h3>
        {counter > 0 && <Counter count={counter} size="default" />}
      </article>
    </Link>
  );
}

MainItem.propTypes = {
  item: ingredientType.isRequired,
  counter: PropTypes.number.isRequired
}

export default MainItem;