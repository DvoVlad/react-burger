import styles from './feed-page.module.css'
import AppFeed from '../components/app-feed/app-feed';
import { FC } from 'react';
import FeedOrderItem from '../components/feed-order-item/feed-order-item';

const FeedPage: FC = () => {
  const testIngredients: string[] = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa0943', '643d69a5c3f7b9001cfa093d'];
  const doneOrderNumbers = [34533, 34532, 34530, 34527, 34525];
  const workOrderNumbers = [34538, 34541, 34542];
  const total = 28752;
  const totalToday = 138;
  return(
    <>
      <h1 className={`${styles.title} text text_type_main-large mb-5 mt-10`}>Лента заказов</h1>
      <AppFeed>
        <ul className={`${styles.feedCollumn}`}>
          <li><FeedOrderItem orderId={34535} name="Death Star Starship Main бургер" date="2021-06-23T14:43:22.587Z" ingredients={testIngredients} /></li>
          <li><FeedOrderItem orderId={34535} name="Death Star Starship Main бургер" date="2021-06-23T14:43:22.587Z" ingredients={testIngredients} /></li>
        </ul>
        <div className={`${styles.totalWrapper}`}>
          <div>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            <ul className={`${styles.collumnDoneList}`}>
              {doneOrderNumbers.map((number) => (
                <li className={`${styles.doneItem} text text_type_digits-default`}>{number}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            <ul className={`${styles.collumnWorkList}`}>
              {workOrderNumbers.map((number) => (
                <li className={`text text_type_digits-default`}>{number}</li>
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