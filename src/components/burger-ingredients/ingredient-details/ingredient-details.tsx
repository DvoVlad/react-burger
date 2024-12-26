import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../../services";
import { useParams } from "react-router-dom";
import { FC } from "react";
const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const item = ingredientsItems.find((item) => item._id === id) || null;
  const loadingStatus = useAppSelector((store) => store.ingredients.loadingStatus);

  return (
    <>
      {loadingStatus === 'loading' && 
        <p>Загрузка...</p>
      }
      {loadingStatus === 'idle' && item &&
        <>
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
      }
      {loadingStatus === 'idle' && item === null && <p>Ингредиент не найден!</p>}
    </>
  );
}

export default IngredientDetails;