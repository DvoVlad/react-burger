import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types';
import PropTypes from 'prop-types';
import styles from './constructor-item.module.css'

function ConstructorItem({item, handleClose}) {
  return (
    <div className={styles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass="ml-2"
        handleClose={handleClose}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ConstructorItem;