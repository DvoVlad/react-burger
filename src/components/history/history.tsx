import { FC } from 'react';
import HistoryOrdersList from '../history-orders-list/history-orders-list';
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
    <HistoryOrdersList orders={orders} isHistory/>
  )
}

export default History;