import { useParams } from "react-router-dom";
import styles from './ingredient-page.module.css'
import NotFound from "./not-found";
import { FC } from 'react'
import { useAppSelector } from "../services";
const IngredientPage: FC = () => {
  const { id } = useParams();
  const ingredientsItems = useAppSelector((store) => store.ingredients.items);
  const item = ingredientsItems.find((item) => item._id === id) || null;
  const loadingStatus = useAppSelector((store) => store.ingredients.loadingStatus);
  return(
    <>
      {loadingStatus === 'loading' && 
        <div className={`${styles.ingredientWrapper}`}>
          <p>Загрузка...</p>
        </div>
      }
      {
        loadingStatus === 'idle' && item &&
        <div className={`${styles.ingredientWrapper}`}>
          <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
          <img width="480" height="240" alt={item.name} src={item.image_large}/>
          <h3 className={`text text_type_main-medium mt-4 mb-8`}>{item.name}</h3>
          <ul className={styles.ingredientInfo}>
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
        </div>
      }
      {loadingStatus === 'idle' && item === null && <NotFound />}
    </>
  );
}

export default IngredientPage;