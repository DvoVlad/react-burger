import styles from './history-page.module.css'
import AppMainProfile from '../components/app-main-profile/app-main-profile';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/exit" className={`${styles.link} text text_type_main-medium`}>
          {({ isActive }) => (
            <span className={!isActive ? "text_color_inactive" : ""}>Выход</span>
          )}
        </NavLink>
        <div id="desc" className={`${styles.text}`}>
          <p className={`mt-20 text text_type_main-default`}>В этом разделе вы можете<br/> просмотреть свою историю заказов</p>
        </div>
      </div>
      <div>
        Тут будет история заказов
      </div>
  </AppMainProfile>
  );
}

export default ProfilePage;