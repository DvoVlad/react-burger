import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { request } from '../../utils/helper';
import { passwordResetEndpoint } from '../../utils/endpoints';
import { useState, FormEvent, FC } from 'react';
import { Navigate } from 'react-router-dom';

const ForgotPassword: FC = () => {
  const [email, setEmailValue] = useState('');
  const [message, setMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!email) {
      setIsErrorEmail(true);
      return;
    } else {
      setIsErrorEmail(false);
    }
    request(passwordResetEndpoint, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("forgot-password", "Y");
      setMessage(data.message);
    })
    .catch((err) => {
      setMessage('Incorrect email');
    });
  }

  return(
    <form className={`${styles.forgotForm}`} onSubmit={onSubmit}>
      {message && <p className='text text_type_main-default text_color_inactive mb-1'>{message}</p>}
      {localStorage.getItem("forgot-password") === 'Y' && <Navigate to="/reset-password" replace />}
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={e => setEmailValue(e.target.value)}
        value={email}
        name={'email'}
        error={isErrorEmail}
        errorText={'Поле не может быть пустым!'}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Восстановить
      </Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
    </form>
  )
}

export default ForgotPassword;