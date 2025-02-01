import { FC } from 'react';
import styles from './feed-order-item.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services';

interface FeedOrderItemProps {
  orderId: number;
  date: string;
  name: string;
  ingredients: string[];
}

const FeedOrderItem: FC<FeedOrderItemProps> = ({ orderId, date, name, ingredients }) => {
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
  return (
    <div className={`${styles.feedItem} p-6`}>
      <div className={`${styles.feedData} mb-6`}>
        <span className='text text_type_digits-default'>#{orderId}</span>
        <span><FormattedDate className="text_color_inactive" date={new Date(date)} /></span>
      </div>
      <h2 className={`text text_type_main-medium mb-6`}>{name}</h2>
      <div className={`${styles.groupIgredients}`}>
        <div className={`${styles.ingredientListWrapper}`}>
          <ul className={`${styles.ingredientList}`}>
            {imagesUrls.map((url) => (
              <li>
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
    </div>
  );
}

export default FeedOrderItem;