import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './edit-profile.module.css'
import { updateUserData } from '../../services/user';
import { useDispatch, useSelector } from 'react-redux';

function EditProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.userData);
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [password, setPassword] = useState(userData?.password || '');
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const changeName = (e) => {
    setName(e.target.value);
    setIsEdit(true);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setIsEdit(true);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
    setIsEdit(true);
  }

  const onReset = (e) => {
    e.preventDefault();
    setName(userData?.name || '');
    setEmail(userData?.email || '');
    setPassword(userData?.password || '');
  }

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
    dispatch(updateUserData({
      name,
      email,
      password
    }));
  }

  return(
    <form onSubmit={onSubmit} onReset={onReset}>
      <Input
        icon={'EditIcon'}
        type={'text'}
        placeholder={'Имя'}
        onChange={changeName}
        value={name}
        name={'name'}
        error={isErrorName}
        errorText={'Поле не может быть пустым!'}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        icon={'EditIcon'}
        type={'email'}
        placeholder={'Логин'}
        onChange={changeEmail}
        value={email}
        name={'email'}
        error={isErrorEmail}
        errorText={'Поле не может быть пустым!'}
        size={'default'}
        extraClass="mt-6"
        />
      <PasswordInput
        icon={'EditIcon'}
        placeholder={'Пароль'}
        onChange={changePassword}
        value={password}
        name={'password'}
        error={isErrorPassword}
        errorText={'Поле не может быть пустым!'}
        size={'default'}
        extraClass="mt-6"
      />
      {isEdit && <div className={`${styles.buttonsWrapper} mt-6`}>
        <Button htmlType="reset" type="secondary" size="medium">
          Отмена
        </Button>
          <Button htmlType="submit" type="primary" size="medium" extraClass='ml-5'>
          Сохранить
        </Button>
      </div>}
    </form>    
  );
}

export default EditProfile;