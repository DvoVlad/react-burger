import { useEffect } from "react";
import { logout } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import styles from './logout-page.module.css'

function LogoutPage() {
  const dispatch = useDispatch();
  const isLogoutError = useSelector((store) => store.user.logoutError)
  useEffect(() => {
    dispatch(logout());
  }, [dispatch])

  return(
    <div className={`${styles.logoutWrapper} mt-5`}>
      {!isLogoutError && <p>Вы вышли из системы</p>}
      {isLogoutError && <p>Не удалось выйти из системы. Попробуйте ещё раз</p>}
    </div>
  )
}

export default LogoutPage;