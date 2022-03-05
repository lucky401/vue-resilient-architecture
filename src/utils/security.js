/**
 * @description It encodes a string into base64.
 * @param str - The string to be encoded.
 * @returns A string.
 */
export const base64Encode = (str) => {
  return Buffer.from(str).toString('base64');
};

/**
 * @description It takes a string and decodes it from base64.
 * @param str - The string to be decoded.
 * @returns The string "Hello, world!"
 */
export const base64Decode = (str) => {
  return Buffer.from(str, 'base64').toString('ascii');
};
