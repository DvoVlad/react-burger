import MainPage from './pages/main-page';
import NotFound from './pages/not-found';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page';
import ProfilePage from './pages/profile-page';
import EditProfilePage from './pages/edit-profile-page/edit-profile-page';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from './services/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('accessToken') !== null) {
      console.log("AUTO and SAVE data");
      dispatch(getUserData());
    }
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
        <Route path="/profile" element={<ProfilePage />} >
          <Route index element={<EditProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
