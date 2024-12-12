import { useEffect, useState } from "react";
import { request } from "../utils/helper";
import { logoutEndpoint } from "../utils/endpoints";
import { clearUserData } from "../services/user";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  const [logout, setLogout] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    request(logoutEndpoint, {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).then(() => {
      localStorage.getItem("accessToken", null);
      localStorage.getItem("refreshToken", null);
      dispatch(clearUserData());
      setLogout(true);
    }).catch(() => {
      setIsLogoutError(true);
    });
  }, [dispatch])

  return(
    <>
      {logout && <p>Вы вышли из системы</p> && <Navigate to="/" replace/>}
      {isLogoutError && <p>Не удалось выйти из системы. Попробуйте ещё раз</p>}
    </>
  )
}

export default LogoutPage;