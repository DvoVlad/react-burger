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
const webSockedHistoryEndpoint: string = `${SOCKED_URL}/orders`;

export { webSockedHistoryEndpoint, getDetailOrderEndpoint, ingredientsEndpoint, sendOrderEndpoint, passwordResetEndpoint, passwordResetStep2Endpoint, registerEndpoint, authEndpoint, userDataEndpoint, updateTokenEndpoint, logoutEndpoint };