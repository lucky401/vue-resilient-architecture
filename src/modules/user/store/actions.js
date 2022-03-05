import * as TYPES from './types';
import * as ROOT_TYPES from '@/store-namespace/root/types';

import services from '../services';

export default {
  /**
   * @description Get all users
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_LIST]({ dispatch }, payload = {}) {
    const { filters } = payload;

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_LIST },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.user
        .list(filters)
        .then((response) => {
          const { items, pagination } = response.data.data;
          resolve({ items, pagination });
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_LIST,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },

  /**
   * @description Add new user
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_ADD]({ dispatch }, payload) {
    if (!payload) {
      throw new Error('payload is required');
    }

    const { data } = payload;

    if (!data) {
      throw new Error('data is required');
    }

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_ADD },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.user
        .add(data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_ADD,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },

  /**
   * @description Update user
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_UPDATE]({ dispatch }, payload) {
    if (!payload) {
      throw new Error('payload is required');
    }

    const { data, id } = payload;

    if (!data) {
      throw new Error('data is required');
    }

    if (!id) {
      throw new Error('id is required');
    }

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_UPDATE },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.user
        .update(data, id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_UPDATE,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },

  /**
   * @description Remove user
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_REMOVE]({ dispatch }, payload) {
    if (!payload) {
      throw new Error('payload is required');
    }

    const { id } = payload;

    if (!id) {
      throw new Error('id is required');
    }

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_REMOVE },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.user
        .remove(id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_REMOVE,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },

  /**
   * @description Get user by id
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_DETAIL]({ dispatch }, payload) {
    if (!payload) {
      throw new Error('payload is required');
    }

    const { id } = payload;

    if (!id) {
      throw new Error('id is required');
    }

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_DETAIL },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.user
        .detail(id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_DETAIL,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },
};
