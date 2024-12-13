import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { request } from '../../utils/helper';
import { passwordResetStep2Endpoint } from '../../utils/endpoints';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorToken, setIsErrorToken] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    if(!password) {
      setIsErrorPassword(true);
      return;
    } else {
      setIsErrorPassword(false);
    }
    if(!token) {
      setIsErrorToken(true);
      return;
    } else {
      setIsErrorToken(false);
    }
    if(!password || !token) return;
    request(passwordResetStep2Endpoint, {
      method: "POST",
      body: JSON.stringify({ password: password, token: token }),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("forgot-password", null)
      setMessage(data.message);
    })
    .catch((err) => {
      setMessage("Incorrect token");
    });
  }

  return(
    <form className={`${styles.resetForm}`} onSubmit={onSubmit}>
      {localStorage.getItem("forgot-password") !== 'Y' && <Navigate to="/forgot-password" replace />}
      {message && <p className='text text_type_main-default text_color_inactive mb-1'>{message}</p>}
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        icon={'ShowIcon'}
        type={'password'}
        placeholder={'Введите новый пароль'}
        onChange={e => setPassword(e.target.value)}
        value={password}
        name={'password'}
        error={isErrorPassword}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setToken(e.target.value)}
        value={token}
        name={'token'}
        error={isErrorToken}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Сохранить
      </Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
    </form>
  )
}

export default ResetPassword;