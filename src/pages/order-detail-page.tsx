import styles from './order-detail-page.module.css';
import { FC } from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {  IOrderDetail } from '../services/order';
import { useAppSelector, useAppDispatch } from '../services';
import { ingredientType } from '../utils/types';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder, resetDetail } from '../services/order';

interface OrderDetailPageProps {
  isModal?: boolean
}

const OrderDetailPage: FC<OrderDetailPageProps> = ({isModal}) => {
  const dispatch = useAppDispatch();

  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const orderLoaded = useAppSelector((store) => store.myOrder.detailOrder);
  const loaddingStatus = useAppSelector((store) => store.myOrder.loadingStatusDetail);
  
  const websockedHistoryOrders = useAppSelector((store) => store.historyWebsocket.orders);
  const websockedAllOrders = useAppSelector((store) => store.allWebsoket.orders);

  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const [orderFromServer, setOrderFromServer] = useState<IOrderDetail>();
  const statuses: Record<string, string> = {
    created: 'Создан',
    pending: 'Готовится',
    done: 'Выполнен'
  }
  const findInWebsocketOrder:IOrderDetail | null = websockedHistoryOrders.find((order) => {
    if(id){
      return order.number === +id;
    }
    return false;
  }) ||
    websockedAllOrders.find((order) => {
      if(id){
        return order.number === +id;
      }
      return false;
    }) || null;
  useEffect(() => {
    if(typeof id === 'string' && !findInWebsocketOrder) {
      dispatch(getOrder(id));
    }
    return () => {
      if(!findInWebsocketOrder) {
        dispatch(resetDetail());
      }
    }
  }, [dispatch, id, findInWebsocketOrder])
  useEffect(() => {
    if(!findInWebsocketOrder) {
      if(orderLoaded !== null && loaddingStatus === 'idle') {
        setOrderFromServer(orderLoaded);
      }
      if(loaddingStatus === 'failed') {
        setIsError(true);
      }
    } else {
      setOrderFromServer(findInWebsocketOrder);
    }
  }, [dispatch, loaddingStatus, orderLoaded, findInWebsocketOrder]);

  let ingredientsList: ingredientType[] = [];
  const mapIngredient:Record<string, ingredientType> = {};
  ingredientsItems.forEach((item) => {
    mapIngredient[item._id] = item;
  });
  if(orderFromServer) {
    const serverIgredients = orderFromServer.ingredients.filter((item) => {
      return item !== null && item !== undefined;
    })
    ingredientsList = serverIgredients.map((id) => {
      let item = mapIngredient[id];
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
      {orderFromServer && <div className={`${isModal ? styles.orderDataWrapperModal : styles.orderDataWrapper}`}>
        <p className={`${styles.number} text text_type_digits-default mb-10`}>#{orderFromServer.number}</p>
        <h2 className={`text text_type_main-medium mb-3`}>{orderFromServer.name}</h2>
        <p className={`${orderFromServer.status === 'done' ? styles.statusDone : ''} text mb-15`}>{statuses[orderFromServer.status]}</p>
        <p className={`text text_type_main-medium mb-6`}>Состав:</p>
        <ul className={`${styles.ingredientsList} pr-2 mb-10`}>
          {ingredientsListUnique.map((item, index) => (
            <li key={index} className={`${styles.ingredientItem}`}>
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