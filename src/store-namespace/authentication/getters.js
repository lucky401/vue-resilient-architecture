import qs from 'qs';

import * as TYPES from './types';
import * as Storage from '@/utils/storage';
import { base64Decode } from '@/utils/security';

export default {
  [TYPES.GET_TOKEN](state) {
    let token = null;

    if (state.token) {
      token = state.token;
    } else {
      token = Storage.getStorage(TYPES.TOKEN_NAME);
    }

    if (!token) return null;

    const decodeToken = base64Decode(token);

    return decodeToken;
  },

  [TYPES.GET_IS_AUTHENTICATED](state) {
    return !!state.token;
  },

  [TYPES.GET_USER_DATA](state) {
    let user = null;

    if (state.user) {
      user = state.user;
    } else {
      user = Storage.getStorage(TYPES.USER_DATA_NAME);
    }

    if (!user) return null;

    const decodeUser = qs.parse(base64Decode(user));

    return decodeUser;
  },
};
