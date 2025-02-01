import { FC } from 'react';
import styles from './history.module.css'
import HistoryOrderItem from '../history-order-item/history-order-item';
import { useAppDispatch, useAppSelector } from '../../services';
import { useEffect, useRef } from 'react';

const History: FC = ()  => {
  const orders = useAppSelector((store) => store.historyWebsocket.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: 'history-websocket/connect'
    });
    return () => {
      dispatch({
        type: 'history-websocket/disconnect'
      });
    }
  },[dispatch]);
  return(
    <ul className={`${styles.historyCollumn}`}>
      {orders.map((item) => (
        <li key={item._id}>
          <HistoryOrderItem isHistory status={item.status} orderId={item.number} name={item.name} date={item.createdAt} ingredients={item.ingredients} />
        </li>
      ))}
    </ul>
  )
}

export default History;