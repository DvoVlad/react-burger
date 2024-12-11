import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './edit-profile-page.module.css'

function EditProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEdit, setIsEdit] = useState(false);

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

  return(
    <form>
      <Input
        icon={'EditIcon'}
        type={'text'}
        placeholder={'Имя'}
        onChange={changeName}
        value={name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
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
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
        />
      <PasswordInput
        icon={'EditIcon'}
        placeholder={'Пароль'}
        onChange={changePassword}
        value={password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
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

export default EditProfilePage;