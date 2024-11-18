import styles from "./order-details.module.css"
import markImage from "../../../images/order-done.png"
import PropTypes from 'prop-types';

function OrderDetails(props) {

  return(
    <>
      <p className={styles.orderNumber + " mt-30 text text_type_digits-large"}>{props.orderId}</p>
      <p className={styles.orderText + " mb-15 text text_type_main-medium"}>идентификатор заказа</p>
      <div className={styles.imageWrapper + " mb-15"}>
        <img width="107" height="102" src={markImage} alt="Заказ оформлен" />
      </div>
      <p className={styles.orderText + " mb-2 text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={styles.orderText + " mb-30 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired
}

export default OrderDetails;