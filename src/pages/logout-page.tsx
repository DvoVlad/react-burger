import { useEffect } from "react";
import { logout } from "../services/user";
import styles from './logout-page.module.css'
import { useAppDispatch, useAppSelector } from "../services";
import { FC } from 'react';

const LogoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLogoutError = useAppSelector((store) => store.user.logoutError)
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