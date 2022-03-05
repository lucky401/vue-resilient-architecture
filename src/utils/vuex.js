import { createNamespacedHelpers } from 'vuex';

/**
 * @description It creates a namespace for the module.
 * @param {Object} module - The module.
 * @returns {Object}
 */
export default (pathModule) => {
  return createNamespacedHelpers(pathModule);
};
