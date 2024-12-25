import React, { FC, ReactNode, ElementType } from 'react';
import styles from './app-header-link.module.css';
import { NavLink } from 'react-router-dom';

interface AppHeaderLinkProps {
  children: ReactNode,
  className: string,
  icon: ElementType,
  link: string
}

const AppHeaderLink: FC<AppHeaderLinkProps> = ({children, className, icon, link}) => {
  let Icon: ElementType = icon;
  
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

export default AppHeaderLink;