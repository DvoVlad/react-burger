import styles from './profile-page.module.css'
import AppMainProfile from "../components/app-main-profile/app-main-profile";
import { NavLink, Outlet } from 'react-router-dom';
function ProfilePage() {
  return(
    <AppMainProfile>
      <div>
        <NavLink to="/profile" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>Профиль</span>
          )}
        </NavLink>
        <NavLink to="/profile/order" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>История заказов</span>
          )}
        </NavLink>
        <NavLink to="/exit" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>Выход</span>
          )}
        </NavLink>
        <p className={`${styles.text} mt-20 text text_type_main-default`}>В этом разделе вы можете<br/>
        изменить свои персональные данные</p>
      </div>
      <div>
        <Outlet />
      </div>
  </AppMainProfile>
  );
}

export default ProfilePage;