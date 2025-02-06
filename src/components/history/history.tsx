import { FC } from 'react';
import styles from './history.module.css'
import HistoryOrderItem from '../history-order-item/history-order-item';
import { useAppDispatch, useAppSelector } from '../../services';
import { useEffect } from 'react';
import { webSockedHistoryEndpoint } from '../../utils/endpoints';
import { connect, disconnect } from '../../services/history-websocket';

const History: FC = ()  => {
  const orders = useAppSelector((store) => store.historyWebsocket.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(webSockedHistoryEndpoint));
    return () => {
      dispatch(disconnect());
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