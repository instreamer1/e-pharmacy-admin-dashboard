// api/auth/auth.api.js

import authInstance from './axios/authInstance';
import privateInstance from './axios/privateInstance';
import publicInstance from './axios/publicInstance';


export const signin = credentials =>
  authInstance.post('/user/signin', credentials);
export const logout = () => authInstance.post('/user/logout');

export const refreshToken = () => {
  // console.log('Sending refresh token request...');
  return authInstance.post('user/refresh');
};

export const getUserInfo = () => {
  // console.log('[getUserInfo] called');
  return privateInstance.get('/user/user-info');
};
export const fetchCartFromServer = () => privateInstance.get('/cart');

export const addProductToCart = credentials => {
  return privateInstance.put('cart/update', credentials);
};

export const addProductToOrder = credentials => {
  return privateInstance.post(`cart/checkout`, credentials);
};
