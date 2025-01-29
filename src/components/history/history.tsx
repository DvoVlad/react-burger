import { FC } from 'react';
import styles from './history.module.css'
import HistoryOrderItem from '../history-order-item/history-order-item';

const History: FC = ()  => {
  const testIngredients: string[] = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093d'];
  return(
    <ul className={`${styles.historyCollumn}`}>
      <li><HistoryOrderItem status="done" orderId={34535} name="Death Star Starship Main бургер" date="2021-06-23T14:43:22.587Z" ingregients={testIngredients} /></li>
      <li><HistoryOrderItem status="pending" orderId={34535} name="Death Star Starship Main бургер" date="2021-06-23T14:43:22.587Z" ingregients={testIngredients} /></li>
    </ul>
  )
}

export default History;