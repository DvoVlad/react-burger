import React,{ FC, ReactNode } from 'react';
import styles from './app-main.module.css';

interface AppMainProps {
  children: ReactNode
}

const AppMain: FC<AppMainProps> = ({children}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMain;