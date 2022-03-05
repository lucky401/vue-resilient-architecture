import Cookie from 'universal-cookie';

const cookie = new Cookie();

/**
 * @description Get the value of a cookie from the browser
 * @param key - The key of the value you want to get from the cookie.
 * @returns A string.
 */
export const getStorage = (key) => {
  return cookie.get(key, { path: '/' });
};

/**
 * @description Get all the cookies from the browser
 * @returns An object with all the keys and values of the cookies.
 */
export const getAllStorage = () => {
  return cookie.getAll();
};

/**
 * @description Set a value in the browser's local storage
 * @param key - The key of the item to be stored.
 * @param value - The value to be stored in the cookie.
 */
export const setStorage = (key, value) => {
  cookie.set(key, value, { path: '/' });
};

/**
 * @description Remove a value from the browser's local storage
 * @param key - The key of the item you want to remove.
 */
export const removeItemStorage = (key) => {
  cookie.remove(key, { path: '/' });
};

/**
 * @description Clear all cookies
 */
export const clearStorage = () => {
  const cookieNames = Object.keys(cookie.getAll());
  cookieNames.forEach((cookieName) => cookie.remove(cookieName, { path: '/' }));
};
