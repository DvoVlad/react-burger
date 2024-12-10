import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { request } from '../../utils/helper';
import { passwordResetEndpoint } from '../../utils/endpoints';
import { useState } from 'react';

function ForgotPassword() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if(!value) return;
    request(passwordResetEndpoint, {
      method: "POST",
      body: JSON.stringify({ email: value }),
      headers: { "Content-Type": "application/json;charset=utf-8" }
    })
    .then((res) => res.json())
    .then((data) => {
      setMessage(data.message);
    })
    .catch((err) => console.log(err));
  }

  return(
    <form className={`${styles.forgotForm}`} onSubmit={onSubmit}>
      {message && <p className='text text_type_main-default text_color_inactive mb-1'>{message}</p>}
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={e => setValue(e.target.value)}
        value={value}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
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