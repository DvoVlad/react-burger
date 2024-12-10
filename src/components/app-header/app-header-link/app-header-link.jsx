import React from 'react';
import styles from './app-header-link.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function AppHeaderLink({children, current, className, icon, link}) {
  let textClass = 'ml-2';
  let type = current ? 'primary' : 'secondary';
  let Icon = icon;

  if(!current) {
    textClass = textClass + ' text_color_inactive';
  }
  
  return (
    <Link to={link} className={styles.link + ' ' + className}>
      <Icon type={type}/><span className={textClass}>{children}</span>
    </Link>
  );
}

AppHeaderLink.propTypes = {
  children: PropTypes.string.isRequired,
  current: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired
}; 

export default AppHeaderLink;