import MainPage from './pages/main-page';
import NotFound from './pages/not-found';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page';
import ProfilePage from './pages/profile-page';
import HistoryPage from './pages/history-page';
import LogoutPage from './pages/logout-page';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData, updateToken, setStatusIdle } from './services/user';
import ProtectedRouteElement from './components/protected-route-element/protected-route-element';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement auth element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement auth element={<HistoryPage />} />} />
        <Route path="/logout" element={<ProtectedRouteElement auth element={<LogoutPage />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
