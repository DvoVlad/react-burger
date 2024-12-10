import { BASE_URL } from "./base-url";

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }
  return response;
}

const request = (url, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
}

export { request };