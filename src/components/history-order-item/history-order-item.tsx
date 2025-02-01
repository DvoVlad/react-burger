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
  status?: string;
  showStatus?: boolean;
  isHistory?: boolean;
}

const HistoryOrderItem: FC<HistoryOrderItemProps> = ({ orderId, date, name, ingredients, status, isHistory = false }) => {
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const mapPriceItems:Record<string, number> = {};
  const mapImagesItems:Record<string, string> = {};
  ingredientsItems.forEach((item) => {
    mapPriceItems[item._id] = item.price;
    mapImagesItems[item._id] = item.image_mobile;
  })
  const price = ingredients.reduce((acc, id) => {
    return acc + mapPriceItems[id];
  }, 0);
  const imagesUrls = ingredients.slice(0, 6).map((id) => {
    return mapImagesItems[id];
  });
  const statuses: Record<string, string> = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }
  const location = useLocation();
  const link = isHistory ? `/profile/orders/${orderId}` : `/feed/${orderId}`;
  return (
    <Link to={link} state={{ background: location }} className={`${styles.historyItem} p-6`}>
      <div className={`${styles.historyData} mb-6`}>
        <span className='text text_type_digits-default'>#{orderId}</span>
        <span><FormattedDate className="text_color_inactive" date={new Date(date)} /></span>
      </div>
      {
        status ?
        <>
          <h2 className={`text text_type_main-medium mb-2`}>{name}</h2>
          <p className={`${status === 'done' ? styles.statusDone : ''} text mb-6`}>{statuses[status]}</p> 
        </>
        :
        <>
          <h2 className={`text text_type_main-medium mb-6`}>{name}</h2>
        </>
      }
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