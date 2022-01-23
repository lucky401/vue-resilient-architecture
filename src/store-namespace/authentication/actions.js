/* eslint-disable no-unused-vars */
import axios from 'axios';
import qs from 'qs';

import * as ROOTTYPES from './../root/types';
import * as TYPES from './types';
import * as Storage from '@/utils/storage';

import { base64Encode } from '@/utils/security';

import api from '@/api';

export default {
  [TYPES.FETCH_LOGIN]({ commit }, payload) {
    const dummyUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@mail.com',
      role: 'admin',
    };

    const jwt =
      'eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQG1haWwuY29tIiwicm9sZSI6ImFkbWluIn0';

    Storage.setStorage(TYPES.TOKEN_NAME, base64Encode(jwt));
    Storage.setStorage(
      TYPES.USER_DATA_NAME,
      base64Encode(qs.stringify(dummyUser))
    );

    commit(TYPES.SET_STATE, { accessor: 'token', value: jwt });
    commit(TYPES.SET_STATE, { accessor: 'userData', value: dummyUser });
  },

  [TYPES.FETCH_LOGOUT]({ commit }, payload) {
    commit(TYPES.SET_STATE, { accessor: 'token', value: '' });
    commit(TYPES.SET_STATE, { accessor: 'userData', value: {} });

    Storage.clearStorage();

    delete axios.defaults.headers.common.Authorization;
  },
};
