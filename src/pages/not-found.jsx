import AppHeader from "../components/app-header/app-header";
function NotFound() {
  return(
    <>
      <AppHeader />
      <div className={`text text_type_main-default mt-10 mb-10 p-5`}>Страница не найдена!</div>
    </>
  )
}

export default NotFound;