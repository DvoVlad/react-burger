import React,{ FC } from 'react';
import type { PropsWithChildren } from "react";
import styles from './app-main.module.css';

const AppMain: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMain;