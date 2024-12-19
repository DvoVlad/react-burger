import styles from './app-main-profile.module.css';
import PropTypes from 'prop-types';

function AppMainProfile({children}) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

AppMainProfile.propTypes = {
  children: PropTypes.node
}

export default AppMainProfile;