import { BASE_URL } from "./base-url";

const checkResponse = (response: Response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }
  return response;
}

interface IOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>
}

const request = (url: string, options?: IOptions) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
}

export { request };