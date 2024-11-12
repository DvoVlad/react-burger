import React from 'react';
import styles from './app-main.module.css';

function AppMain({children}) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMain;