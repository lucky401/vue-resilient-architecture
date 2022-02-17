import * as TYPES from './types';
import * as Storage from '@/utils/storage';

export const getDefaultState = () => ({
  userData: {},
  token: !!Storage.getStorage(TYPES.TOKEN_NAME),
});

export default getDefaultState;
