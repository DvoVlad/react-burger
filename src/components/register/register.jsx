import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function Register() {
  return(
    <form className={`${styles.registerForm}`}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        value=""
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
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
      <Input
        icon={'ShowIcon'}
        type={'password'}
        placeholder={'Пароль'}
        value=""
        name={'password'}
        error={false}
        errorText={'Ошибка'}
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