import { useEffect } from "react";
import { logout } from "../services/user";
import { useDispatch, useSelector } from "react-redux";

function LogoutPage() {
  const dispatch = useDispatch();
  const isLogoutError = useSelector((store) => store.user.logoutError)
  useEffect(() => {
    dispatch(logout());
  }, [dispatch])

  return(
    <>
      {!isLogoutError && <p>Вы вышли из системы</p>}
      {isLogoutError && <p>Не удалось выйти из системы. Попробуйте ещё раз</p>}
    </>
  )
}

export default LogoutPage;