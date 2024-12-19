import React from 'react';
import styles from './app-main.module.css';
import PropTypes from 'prop-types';

function AppMain({children}) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

AppMain.propTypes = {
  children: PropTypes.node
}

export default AppMain;