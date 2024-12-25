import React,{ FC, ReactNode } from 'react';
import styles from './app-main-profile.module.css';

interface AppMainProfileProps {
  children: ReactNode
}

const AppMainProfile: FC<AppMainProfileProps> = ({children}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMainProfile;