import { FC } from 'react';
import HistoryOrdersList from '../history-orders-list/history-orders-list';
import { useAppDispatch, useAppSelector } from '../../services';
import { useEffect } from 'react';
import { webSocketHistoryEndpoint } from '../../utils/endpoints';
import { connect, disconnect } from '../../services/history-websocket';

const History: FC = ()  => {
  const orders = useAppSelector((store) => store.historyWebsocket.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(webSocketHistoryEndpoint));
    return () => {
      dispatch(disconnect());
    }
  },[dispatch]);
  return(
    <HistoryOrdersList orders={orders} isHistory/>
  )
}

export default History;