/* eslint-disable no-unused-vars */
import axios from 'axios';
import qs from 'qs';

import * as TYPES from './types';
import * as ROOT_TYPES from '@/store-namespace/root/types';

import * as Storage from '@/utils/storage';
import { base64Encode } from '@/utils/security';

import commonServices from '@/common/services';

export default {
  /**
   * @description Login user then save token and user data to local storage
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_LOGIN]({ commit, dispatch }, payload) {
    if (!payload) {
      throw new Error('payload is required');
    }

    const { email, password } = payload;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    commit(TYPES.SET_STATE, {
      accessor: 'status.auth',
      value: 'pending',
    });

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_LOGIN },
      { root: true }
    );

    return new Promise((resolve, reject) => {
      commonServices.authentication
        .login(payload)
        .then((response) => {
          const { data: user, token } = response.data;

          const encryptedToken = base64Encode(token);

          const encryptedUser = base64Encode(qs.stringify(user));

          Storage.setStorage(TYPES.TOKEN_NAME, encryptedToken);
          Storage.setStorage(TYPES.USER_DATA_NAME, encryptedUser);

          commit(TYPES.SET_STATE, {
            accessor: 'token',
            value: encryptedToken,
          });

          commit(TYPES.SET_STATE, {
            accessor: 'user',
            value: encryptedUser,
          });

          axios.defaults.headers.common.authorization = token;

          resolve({ user });
        })
        .catch((error) => {
          commit(TYPES.SET_STATE, { accessor: 'token', value: null });
          commit(TYPES.SET_STATE, { accessor: 'user', value: null });

          commit(TYPES.SET_STATE, {
            accessor: 'status.auth',
            value: 'rejected',
          });

          dispatch(TYPES.FETCH_CLEAR_SESSION);

          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_LOGIN,
            },
            { root: true }
          );

          reject(error);
        })
        .finally(() => {
          commit(TYPES.SET_STATE, {
            accessor: 'status.auth',
            value: 'resolved',
          });
        });
    });
  },

  /**
   * @description Logout user then clear token and user data from local storage
   * @returns {Promise}
   */
  [TYPES.FETCH_LOGOUT]({ commit, dispatch }) {
    commit(TYPES.SET_STATE, {
      accessor: 'status.auth',
      value: 'pending',
    });

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_LOGOUT },
      { root: true }
    );

    return new Promise((resolve, reject) => {
      commonServices.authentication
        .logout()
        .then((response) => {
          dispatch(TYPES.FETCH_CLEAR_SESSION);

          resolve(response);
        })
        .catch((error) => {
          commit(TYPES.SET_STATE, {
            accessor: 'status.auth',
            value: 'rejected',
          });

          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_LOGOUT,
            },
            { root: true }
          );

          reject(error);
        })
        .finally(() => {
          commit(TYPES.SET_STATE, {
            accessor: 'status.auth',
            value: 'resolved',
          });
        });
    });
  },

  /**
   * @description Get current user profile and update user data in local storage
   * @returns {Promise}
   */
  [TYPES.FETCH_USER]({ commit, dispatch }) {
    commit(TYPES.SET_STATE, {
      accessor: 'status.user',
      value: 'pending',
    });

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      commonServices.authentication
        .currentUser()
        .then((response) => {
          const { data } = response.data;

          const encryptedUser = base64Encode(qs.stringify(data));

          Storage.setStorage(TYPES.USER_DATA_NAME, encryptedUser);

          commit(TYPES.SET_STATE, {
            accessor: 'user',
            value: encryptedUser,
          });

          resolve({ data });
        })
        .catch((error) => {
          commit(TYPES.SET_STATE, { accessor: 'user', value: null });

          commit(TYPES.SET_STATE, {
            accessor: 'status.user',
            value: 'rejected',
          });

          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER,
            },
            { root: true }
          );

          reject(error);
        })
        .finally(() => {
          commit(TYPES.SET_STATE, {
            accessor: 'status.user',
            value: 'resolved',
          });
        });
    });
  },

  /**
   * @description Clear token and user data from local storage
   * @returns {Promise}
   */
  [TYPES.FETCH_CLEAR_SESSION]({ commit }) {
    commit(TYPES.SET_STATE, { accessor: 'token', value: null });
    commit(TYPES.SET_STATE, { accessor: 'user', value: null });

    Storage.clearStorage();

    delete axios.defaults.headers.common.Authorization;
  },
};
