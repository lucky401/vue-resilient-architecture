import * as TYPES from './types';
import * as Storage from '@/utils/storage';

export const getDefaultState = () => ({
  user: Storage.getStorage(TYPES.USER_DATA_NAME) || null,
  token: Storage.getStorage(TYPES.TOKEN_NAME) || null,
  status: {
    auth: 'idle',
    user: 'idle',
  },
});

export default getDefaultState;
