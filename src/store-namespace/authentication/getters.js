import qs from 'qs';

import * as TYPES from './types';
import * as Storage from '@/utils/storage';
import { base64Decode } from '@/utils/security';

export default {
  [TYPES.GET_TOKEN]() {
    const rawToken = Storage.getStorage(TYPES.TOKEN_NAME);
    const decodeToken = base64Decode(rawToken);
    return decodeToken;
  },

  [TYPES.GET_IS_AUTHENTICATED]() {
    return !!Storage.getStorage(TYPES.TOKEN_NAME);
  },

  [TYPES.GET_USER_DATA]() {
    const rawUser = Storage.getStorage(TYPES.USER_DATA_NAME);
    const decodeUser = qs.parse(base64Decode(rawUser));
    return decodeUser;
  },
};
