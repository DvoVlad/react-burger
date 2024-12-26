import styles from "./order-details.module.css"
import markImage from "../../../images/order-done.png"
import { useAppSelector } from "../../../services";
function OrderDetails() {
  const loadingStatus = useAppSelector((store) => store.myOrder.loadingStatus)
  const orderData = useAppSelector((store) => store.myOrder.data);
  const isError = useAppSelector((store) => store.myOrder.error);
  return(
    <>
      {loadingStatus === 'loading' && <p className="text_type_main-medium m-5">Загрузка...</p>}
      {orderData &&
        <>
          <p className={styles.orderNumber + " mt-30 text text_type_digits-large"}>{orderData.order.number}</p>
          <p className={styles.orderText + " mb-15 text text_type_main-medium"}>идентификатор заказа</p>
          <div className={styles.imageWrapper + " mb-15"}>
            <img width="107" height="102" src={markImage} alt="Заказ оформлен" />
          </div>
          <p className={styles.orderText + " mb-2 text text_type_main-default"}>Ваш заказ начали готовить</p>
          <p className={styles.orderText + " mb-30 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
        </>
      }
      {isError && <p className="text_type_main-medium">Произошла ошибка! Попробуйте ещё раз!</p>}
    </>
  );
}

export default OrderDetails;