import React from 'react';
import styles from './app-header-link.module.css';
import PropTypes from 'prop-types';

function AppHeaderLink({children, current, className, icon}) {
  let classes = className;
  let type = current ? 'primary' : 'secondary';
  let Icon = icon;

  if(current) {
    classes = classes + ' ' + styles.active
  }
  
  return (
    <button className={styles.link + ' ' + classes}>
      <Icon type={type}/><span className='ml-2'>{children}</span>
    </button>
  );
}

AppHeaderLink.propTypes = {
  children: PropTypes.string,
  current: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.elementType
}; 

export default AppHeaderLink;