import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/user';

function Login() {
  const dispatch = useDispatch();
  const isErrorAuth = useSelector((store) => store.user.errorAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if(!email) {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
    if(!password) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
    if(!email && !password) return;

    dispatch(authUser({
      email,
      password
    }));
  }
  return(
    <form className={`${styles.loginForm}`} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      {isErrorAuth && <p>Неверный логин или пароль!</p>}
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={e => setEmail(e.target.value)}
        value={email}
        name={'email'}
        error={isErrorEmail}
        errorText={'Введите Email'}
        size={'default'}
        extraClass="mt-6"
      />
      <PasswordInput
        placeholder={'Пароль'}
        onChange={e => setPassword(e.target.value)}
        value={password}
        name={'password'}
        error={isErrorPassword}
        errorText={'Введите пароль'}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
        Войти
      </Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>Вы — новый пользователь? <Link className={styles.link} to="/register">Зарегистрироваться</Link></p>
      <p className='text text_type_main-default text_color_inactive mt-4'>Забыли пароль? <Link className={styles.link} to="/forgot-password">Восстановить пароль</Link></p>
    </form>
  )
}

export default Login;