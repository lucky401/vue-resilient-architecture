import { get } from 'lodash';

/**
 * Get the value of a key in an object, or a default value if the key does not exist
 * @param obj - The object to search.
 * @param key - The key to get the value for.
 * @param defaultValue - The default value to return if the key is not found.
 * @returns The value of the key in the object.
 */
export const getValueByKey = (obj, key, defaultValue) => {
  return get(obj, key, defaultValue);
};
