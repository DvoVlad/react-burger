import styles from './app-main-profile.module.css';

function AppMainProfile({children}) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default AppMainProfile;