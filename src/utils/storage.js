import Cookie from 'universal-cookie';

const cookie = new Cookie();

export const getStorage = (key) => {
  return cookie.get(key, { path: '/' });
};

export const getAllStorage = () => {
  return cookie.getAll();
};

export const setStorage = (key, value) => {
  cookie.set(key, value, { path: '/' });
};

export const removeItemStorage = (key) => {
  cookie.remove(key, { path: '/' });
};

export const clearStorage = () => {
  const cookieNames = Object.keys(cookie.getAll());

  cookieNames.forEach((cookieName) => cookie.remove(cookieName, { path: '/' }));
};
