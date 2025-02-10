import React,{ FC } from 'react';
import type { PropsWithChildren } from "react";
import styles from './app-feed.module.css';

const AppFeed: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppFeed;