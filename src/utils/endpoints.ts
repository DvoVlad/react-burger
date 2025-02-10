import { SOCKED_URL } from "./base-url";
const ingredientsEndpoint: string = `/ingredients`;
const sendOrderEndpoint: string = `/orders`;
const passwordResetEndpoint: string = '/password-reset';
const passwordResetStep2Endpoint: string = '/password-reset/reset';
const registerEndpoint: string = '/auth/register';
const authEndpoint: string = '/auth/login';
const userDataEndpoint: string = '/auth/user';
const updateTokenEndpoint: string = '/auth/token'
const logoutEndpoint: string = '/auth/logout';
const getDetailOrderEndpoint: string = '/orders/';
const webSocketHistoryEndpoint: string = `${SOCKED_URL}/orders`;
const webSocketAllEndpoint: string = `${SOCKED_URL}/orders/all`;

export { webSocketAllEndpoint, webSocketHistoryEndpoint, getDetailOrderEndpoint, ingredientsEndpoint, sendOrderEndpoint, passwordResetEndpoint, passwordResetStep2Endpoint, registerEndpoint, authEndpoint, userDataEndpoint, updateTokenEndpoint, logoutEndpoint };