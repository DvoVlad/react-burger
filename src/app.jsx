import MainPage from './pages/main-page';
import NotFound from './pages/not-found';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './components/app-header/app-header';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
