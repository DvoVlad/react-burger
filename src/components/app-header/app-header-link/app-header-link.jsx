import React from 'react';
import styles from './app-header-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
function AppHeaderLink({children, className, icon, link}) {
  let Icon = icon;
  
  return (
    <NavLink to={link} className={styles.link + ' ' + className}>
      {({ isActive}) => (
        <>
          <Icon type={`${isActive ? 'primary' : 'secondary'}`} /><span className={`ml-2 ${!isActive ? 'text_color_inactive' : ''}`}>{children}</span>
        </>
      )}
    </NavLink>
  );
}

AppHeaderLink.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired
}; 

export default AppHeaderLink;