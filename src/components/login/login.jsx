import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function Login() {
  return(
    <form className={`${styles.loginForm}`}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        value=""
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <PasswordInput
        placeholder={'Пароль'}
        value=""
        name={'password'}
        error={false}
        errorText={'Ошибка'}
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