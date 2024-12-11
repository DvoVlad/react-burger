import styles from './register.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/user';

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      setIsErrorName(true);
      return
    } else {
      setIsErrorName(false);
    }
    if(!email) {
      setIsErrorEmail(true);
      return
    } else {
      setIsErrorEmail(false);
    }
    if(!password) {
      setIsErrorPassword(true);
      return
    } else {
      setIsErrorPassword(false);
    }

    dispatch(registerUser({
      email,
      password,
      name
    }));
  }

  return(
    <form className={`${styles.registerForm}`} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setName(e.target.value)}
        value={name}
        name={'name'}
        error={isErrorName}
        errorText={'Введите имя'}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'email'}
        onChange={e => setEmail(e.target.value)}
        placeholder={'E-mail'}
        value={email}
        name={'email'}
        error={isErrorEmail}
        errorText={'Введите email'}
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
        Зарегистрироваться
      </Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>Уже зарегистрированы? <Link className={styles.link} to="/login">Войти</Link></p>
    </form>
  )
}

export default Register;