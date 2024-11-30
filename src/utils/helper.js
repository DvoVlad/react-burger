const checkResponce = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
}

export { checkResponce };