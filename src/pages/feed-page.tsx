import styles from './feed-page.module.css'
import AppFeed from '../components/app-feed/app-feed';
import { FC, useEffect } from 'react';
import HistoryOrdersList from '../components/history-orders-list/history-orders-list';
import { useAppDispatch, useAppSelector } from '../services';
import { webSocketAllEndpoint } from '../utils/endpoints';
import { connect, disconnect } from '../services/all-websocket';

const FeedPage: FC = () => {
  const allOrders = useAppSelector((store) => store.allWebsoket.orders);
  const doneOrders = allOrders.filter((item) => item.status === 'done');
  const doneOrderNumbers = doneOrders.slice(0, 10).map((item) => {
    return item.number;
  });
  const pendingOrders = allOrders.filter((item) => item.status === 'pending');
  const workOrderNumbers = pendingOrders.slice(0, 10).map((item) => {
    return item.number;
  });;
  const total = useAppSelector((store) => store.allWebsoket.total);
  const totalToday = useAppSelector((store) => store.allWebsoket.totalToday);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(webSocketAllEndpoint));
    return () => {
      dispatch(disconnect())
    }
  }, [dispatch])
  return(
    <>
      <h1 className={`${styles.title} text text_type_main-large mb-5 mt-10`}>Лента заказов</h1>
      <AppFeed>
        <HistoryOrdersList orders={allOrders}/>
        <div className={`${styles.totalWrapper}`}>
          <div>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            <ul className={`${styles.collumnDoneList}`}>
              {doneOrderNumbers.map((number) => (
                <li key={number} className={`${styles.doneItem} text text_type_digits-default`}>{number}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            <ul className={`${styles.collumnWorkList}`}>
              {workOrderNumbers.map((number) => (
                <li key={number} className={`text text_type_digits-default`}>{number}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.totalDoneWrapper}`}>
              <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
              <p className={`${styles.result} text text_type_digits-large`}>{total}</p>
          </div>
          <div className={`${styles.totalDoneWrapper}`}>
              <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
              <p className={`${styles.result} text text_type_digits-large`}>{totalToday}</p>
          </div>
        </div>
      </AppFeed>
    </>
  );
}

export default FeedPage;