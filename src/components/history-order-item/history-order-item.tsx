import { FC } from 'react';
import styles from './history-order-item.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

interface HistoryOrderItemProps {
  orderId: number;
  date: string;
  name: string;
  ingredients: string[];
  status: string;
}

const HistoryOrderItem: FC<HistoryOrderItemProps> = ({ orderId, date, name, ingredients, status }) => {
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const mapPriceItems:Record<string, number> = {};
  ingredientsItems.forEach((item) => {
    mapPriceItems[item._id] = item.price;
  })
  const price = ingredients.reduce((acc, id) => {
    return acc + mapPriceItems[id];
  }, 0);
  const imagesUrls = ingredients.slice(0, 6).map((id) => {
    let item = ingredientsItems.find((item) => item._id === id);
    return item?.image_mobile;
  });
  const statuses: Record<string, string> = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }
  const location = useLocation();
  return (
    <Link to={`/profile/orders/${orderId}`} state={{ background: location }} className={`${styles.historyItem} p-6`}>
      <div className={`${styles.historyData} mb-6`}>
        <span className='text text_type_digits-default'>#{orderId}</span>
        <span><FormattedDate className="text_color_inactive" date={new Date(date)} /></span>
      </div>
      <h2 className={`text text_type_main-medium mb-2`}>{name}</h2>
      <p className={`${status === 'done' ? styles.statusDone : ''} text mb-6`}>{statuses[status]}</p>
      <div className={`${styles.groupIgredients}`}>
        <div className={`${styles.ingredientListWrapper}`}>
          <ul className={`${styles.ingredientList}`}>
            {imagesUrls.map((url, index) => (
              <li key={index}>
                <img className={`${styles.image}`} src={url} height="64" width="64" alt="Ингредиенты" />
              </li>
            ))}
          </ul>
          {ingredients.length > 6 && <span className={`text text_type_digits-default ${styles.counter}`}>+ {ingredients.length - 6}</span>}
        </div>
        <p className={styles.price + ` text text_type_digits-default`}>
          <span className={`mr-2`}>{price}</span><CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
}

export default HistoryOrderItem;