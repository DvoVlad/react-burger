import styles from "./order-details.module.css"
import markImage from "../../../images/order-done.png"
import { useSelector } from "react-redux";
function OrderDetails() {
  const ordenNumber =  useSelector((store) => store.order.number);
  return(
    <>
      <p className={styles.orderNumber + " mt-30 text text_type_digits-large"}>{ordenNumber}</p>
      <p className={styles.orderText + " mb-15 text text_type_main-medium"}>идентификатор заказа</p>
      <div className={styles.imageWrapper + " mb-15"}>
        <img width="107" height="102" src={markImage} alt="Заказ оформлен" />
      </div>
      <p className={styles.orderText + " mb-2 text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={styles.orderText + " mb-30 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

export default OrderDetails;