import styles from './profile-page.module.css'
import AppMainProfile from "../components/app-main-profile/app-main-profile";
import { NavLink } from 'react-router-dom';
import EditProfile from '../components/edit-profile/edit-profile';
function ProfilePage() {
  return(
    <AppMainProfile>
      <div>
        <NavLink to="/profile" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>Профиль</span>
          )}
        </NavLink>
        <NavLink to="/profile/orders" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>История заказов</span>
          )}
        </NavLink>
        <NavLink to="/logout" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>Выход</span>
          )}
        </NavLink>
        <div id="desc" className={`${styles.text}`}>
          <p className={`mt-20 text text_type_main-default`}>В этом разделе вы можете<br/>
          изменить свои персональные данные</p>
        </div>
      </div>
      <div>
        <EditProfile />
      </div>
  </AppMainProfile>
  );
}

export default ProfilePage;