import React from 'react';
import styles from './app-header.module.css';
import AppHeaderLink from './app-header-link/app-header-link';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={styles.header + " mt-10"}>
      <div className={styles.container + ' pt-4 pb-4'}>
        <AppHeaderLink className="pt-4 pb-4 pl-5 pr-5 text text_type_main-default" icon={BurgerIcon} link="/">Конструктор</AppHeaderLink>
        <AppHeaderLink className="ml-2 pt-4 pb-4 pl-5 pr-5 text text_type_main-default" icon={ListIcon} link="/profile/orders">Лента заказов</AppHeaderLink>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <AppHeaderLink className="pt-4 pb-4 pl-5 pr-5 text text_type_main-default" icon={ProfileIcon} link="/profile">Личный кабинет</AppHeaderLink>
      </div>
    </header>
  );
}

export default AppHeader;