import styles from './history-orders-list.module.css'
import { FC } from 'react';
import HistoryOrderItem from '../history-order-item/history-order-item';
import { IOrderDetail } from '../../services/order';

interface HistoryOrdersListProps{
  orders: IOrderDetail[];
  isHistory?: boolean;
}

const HistoryOrdersList: FC<HistoryOrdersListProps> = ({orders, isHistory = false}) => {
  return(
    <ul className={`${styles.historyCollumn}`}>
      {orders.map((item) => (
        <li key={item._id}>
          <HistoryOrderItem isHistory={isHistory} status={item.status} orderId={item.number} name={item.name} date={item.createdAt} ingredients={item.ingredients} />
        </li>
      ))}
    </ul>
  );
}

export default HistoryOrdersList;