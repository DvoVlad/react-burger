import React from 'react';
import styles from './app-header-link.module.css';

function AppHeaderLink({children, current, className, icon}) {
  let classes = className;
  let type = current ? 'primary' : 'secondary';
  let Icon = icon;

  if(current) {
    classes = classes + ' ' + styles.active
  }
  return (
    <button className={styles.link + ' ' + classes}>
      <Icon type={type}/> {children}
    </button>
  );
}

export default AppHeaderLink;