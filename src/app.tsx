import MainPage from './pages/main-page';
import NotFound from './pages/not-found';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page';
import ProfilePage from './pages/profile-page';
import History from './components/history/history';
import LogoutPage from './pages/logout-page';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
import { useEffect, useRef } from 'react';
import { getUserData, updateToken, setStatusIdle } from './services/user';
import ProtectedRouteElement from './components/protected-route-element/protected-route-element';
import { fetchIngredients } from './services/ingredients';
import IngredientPage from './pages/ingredient-page';
import Modal from './components/modal/modal';
import IngredientDetails from './components/burger-ingredients/ingredient-details/ingredient-details';
import EditProfile from './components/edit-profile/edit-profile';
import { useAppDispatch } from './services';
import { FC } from 'react';
const App: FC = () => {
  const dispatch = useAppDispatch();
  let isDispatched = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(isDispatched.current) {
      return
    }
    const handleAuth = async () => {
      if(localStorage.getItem('accessToken') !== null) {
        console.log("AUTO and SAVE data");
        const result = await dispatch(getUserData());
        if(getUserData.rejected.match(result)) {
          const updateTokenResult = await dispatch(updateToken());
          if(!updateToken.rejected.match(updateTokenResult)) {
            dispatch(getUserData());
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }
      } else {
        dispatch(setStatusIdle());
      }
    }
    handleAuth();
    dispatch(fetchIngredients());
    return () => {
      isDispatched.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.background ?? location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement auth element={<ProfilePage />} />}>
           <Route index element={<EditProfile />} />
           <Route path="orders" element={<History />} />
        </Route>
        <Route path="/logout" element={<ProtectedRouteElement auth element={<LogoutPage />} />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.state?.background ? (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => navigate(-1)} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      ) : null}
    </>
  );
}

export default App;
