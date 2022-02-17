import qs from 'qs';

import * as TYPES from './types';
import * as Storage from '@/utils/storage';
import { base64Decode } from '@/utils/security';

export default {
  [TYPES.GET_TOKEN](state) {
    if (state.token) {
      return state.token;
    }

    const rawToken = Storage.getStorage(TYPES.TOKEN_NAME);
    if (!rawToken) return null;

    const decodeToken = base64Decode(rawToken);

    return decodeToken;
  },

  [TYPES.GET_IS_AUTHENTICATED](state) {
    return !!state.token;
  },

  [TYPES.GET_USER_DATA](state) {
    if (state.userData) {
      return state.userData;
    }

    const rawUser = Storage.getStorage(TYPES.USER_DATA_NAME);
    if (!rawUser) return null;

    const decodeUser = qs.parse(base64Decode(rawUser));

    return decodeUser;
  },
};
