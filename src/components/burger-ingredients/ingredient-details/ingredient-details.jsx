import { ingredientType } from "../../../utils/types";
import styles from "./ingredient-details.module.css";

function IngredientDetails({item}) {
  return (
    <>
      <p className={styles.mainTitle + " text text_type_main-large mt-10 pl-10 pr-10"}>Детали ингредиента</p>
      <div className={styles.imageWrapper}>
        <img width="480" height="240" src={item.image_large} alt={item.name} />
      </div>
      <h2 className={styles.title + " text text_type_main-medium mt-4 mb-8"}>{item.name}</h2>
      <ul className={styles.ingredientInfo + " mb-15"}>
        <li className={styles.ingredientItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
        </li>
        <li className={styles.ingredientItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
        </li>
        <li className={styles.ingredientItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
        </li>
        <li className={styles.ingredientItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  item: ingredientType.isRequired
}

export default IngredientDetails;