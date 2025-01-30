import styles from './order-detail-page.module.css';
import { FC } from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { request } from '../utils/helper';
import { getDetailOrderEndpoint } from '../utils/endpoints';
import { IOrderDetailResponse, IOrderDetail } from '../services/order';
import { useAppSelector } from '../services';
import { ingredientType } from '../utils/types';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetailPage: FC = () => {
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const [orderFromServer, setOrderFromServer] = useState<IOrderDetail>();
  const statuses: Record<string, string> = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }
  useEffect(() => {
    const findInWebsocketOrder:IOrderDetail | null = null;
    if(!findInWebsocketOrder) {
      request(`${getDetailOrderEndpoint}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
      .then((res) => {
        return res.json(); 
      })
      .then((data: IOrderDetailResponse) => {
        setOrderFromServer(data.orders[0]);
      })
      .catch(() => {
        setIsError(true);
      });
    } else {
      setOrderFromServer(findInWebsocketOrder);
    }
  }, [id]);

  let ingredientsList: ingredientType[] = [];
  if(orderFromServer) {
    ingredientsList = orderFromServer.ingredients.map((id) => {
      let item = ingredientsItems.find((item) => item._id === id) as ingredientType;
      return item;
    });
  }
  let ingredientsCounters: Record<string, number> = {};
  ingredientsList.forEach(item => {
    ingredientsCounters[item._id] = ingredientsCounters[item._id] ? ingredientsCounters[item._id] + 1 : 1;
  });

  let totalPrice = 0;
  const repeatedItems:string[] = [];
  const ingredientsListUnique = ingredientsList.reduce((acc: ingredientType[], item) => {
    totalPrice += item.price;
    if(!repeatedItems.includes(item._id)) {
      acc.push(item);
      repeatedItems.push(item._id);
    }
    return acc;
  }, []);

  return(
    <>
      {isError && <p>Не удалось загрузить</p>}
      {orderFromServer && <div className={`${styles.orderDataWrapper}`}>
        <p className={`${styles.number} text text_type_digits-default mb-10`}>#{orderFromServer.number}</p>
        <h2 className={`text text_type_main-medium mb-3`}>{orderFromServer.name}</h2>
        <p className={`${orderFromServer.status === 'done' ? styles.statusDone : ''} text mb-15`}>{statuses[orderFromServer.status]}</p>
        <p className={`text text_type_main-medium mb-6`}>Состав:</p>
        <ul className={`${styles.ingredientsList} pr-2 mb-10`}>
          {ingredientsListUnique.map((item) => (
            <li className={`${styles.ingredientItem}`}>
              <div className={`${styles.imageWrapper}`}>
                <img className={`${styles.image}`} height="60" width="60" src={item.image_mobile} alt={item.name} />
              </div>
              <p className={`text text_type_main-default`}>{item.name}</p>
              <p className={`${styles.itemPrice} text text_type_digits-default`}>{ingredientsCounters[item._id]} x {item.price} <CurrencyIcon type="primary" /></p>
            </li>
          ))}
        </ul>
        <div className={`${styles.totalWrapper}`}>
          <FormattedDate className="text_color_inactive" date={new Date(orderFromServer.createdAt)} />
          <span className={`text text_type_digits-default`}>{totalPrice} <CurrencyIcon type="primary" /></span>
        </div>
      </div>}
    </>
  )
}

export default OrderDetailPage;