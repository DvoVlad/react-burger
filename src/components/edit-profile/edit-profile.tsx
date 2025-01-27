import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, FormEvent } from 'react';
import styles from './edit-profile.module.css'
import { updateUserData, updateToken, clearUserData } from '../../services/user';
import { useAppDispatch, useAppSelector } from '../../services';

function EditProfile() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((store) => store.user.userData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  useEffect(() => {
    const name = userData?.name || '';
    const email = userData?.email || '';
    setName(name);
    setEmail(email)
  }, [userData])

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEdit(true);
  }

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEdit(true);
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsEdit(true);
  }

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setName(userData?.name || '');
    setEmail(userData?.email || '');
    setPassword('');
    setIsEdit(false);
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!name) {
      setIsErrorName(true);
    } else {
      setIsErrorName(false);
    }
    if(!email) {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }

    if(!name || !email || (password.length > 0 && password.length < 6)) return;

    let sendData;
    if(password !== '') {
      sendData = {
        name,
        email,
        password
      };
    } else {
      sendData = {
        name,
        email
      };
    }
    const result = await dispatch(updateUserData(sendData));
    if(updateUserData.rejected.match(result)) {
      const updateTokenResult = await dispatch(updateToken());
      if(!updateToken.rejected.match(updateTokenResult)) {
        dispatch(updateUserData(sendData));
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUserData());
      }
    }
    setPassword('');
    setIsEdit(false);
  }

  return(
    <form onSubmit={onSubmit} onReset={onReset}>
      {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
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
      {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
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
        placeholder={'Новый пароль'}
        onChange={changePassword}
        value={password}
        name={'password'}
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