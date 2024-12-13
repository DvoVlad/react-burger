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
import { getUserData, updateToken } from './services/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuth = async () => {
      if(localStorage.getItem('accessToken') !== null) {
        console.log("AUTO and SAVE data");
        const result = await dispatch(getUserData());
        if(getUserData.rejected.match(result)) {
          await dispatch(updateToken());
          dispatch(getUserData());
        }
      }
    }
    handleAuth();
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/orders" element={<HistoryPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
