import { FC } from 'react';
import styles from './history-order-item.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services';

interface HistoryOrderItemProps {
  orderId: number;
  date: string;
  name: string;
  ingregients: string[];
  status: string;
}

const HistoryOrderItem: FC<HistoryOrderItemProps> = ({ orderId, date, name, ingregients, status }) => {
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const price = ingredientsItems.reduce((acc, item) => {
    if(ingregients.includes(item._id)) {
      return acc + item.price;
    }
    return acc;
  }, 0);
  const imagesUrls = ingregients.slice(0, 6).map((id) => {
    let item = ingredientsItems.find((item) => item._id === id);
    return item?.image_mobile;
  });
  const statuses: Record<string, string> = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }
  return (
    <div className={`${styles.historyItem} p-6`}>
      <div className={`${styles.historyData} mb-6`}>
        <span className='text text_type_digits-default'>#{orderId}</span>
        <span><FormattedDate className="text_color_inactive" date={new Date(date)} /></span>
      </div>
      <h2 className={`text text_type_main-medium mb-2`}>{name}</h2>
      <p className={`${status === 'done' ? styles.statusDone : ''} text mb-6`}>{statuses[status]}</p>
      <div className={`${styles.groupIgredients}`}>
        <div className={`${styles.ingredientListWrapper}`}>
          <ul className={`${styles.ingredientList}`}>
            {imagesUrls.map((url) => (
              <li>
                <img className={`${styles.image}`} src={url} height="64" width="64" alt="Ингредиенты" />
              </li>
            ))}
          </ul>
          {ingregients.length > 6 && <span className={`text text_type_digits-default ${styles.counter}`}>+ {ingregients.length - 6}</span>}
        </div>
        <p className={styles.price + ` text text_type_digits-default`}>
          <span className={`mr-2`}>{price}</span><CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}

export default HistoryOrderItem;