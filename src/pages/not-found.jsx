import styles from './not-found.module.css'

function NotFound() {
  return(
    <>
      <div className={`${styles.wrapper} text text_type_main-default mt-10 mb-10 p-5`}>Страница не найдена!</div>
    </>
  )
}

export default NotFound;