import React,{ FC } from 'react';
import type { PropsWithChildren } from "react";
import styles from './app-main-profile.module.css';

const AppMainProfile: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMainProfile;