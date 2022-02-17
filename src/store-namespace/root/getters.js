import * as TYPES from './types';

export default {
  [TYPES.GET_IS_LOADING](state) {
    return state.isLoading;
  },

  [TYPES.GET_ERROR_DETAIL](state) {
    return state.errors;
  },

  [TYPES.GET_ERROR_MESSAGE](state) {
    return state.errorMessage;
  },
};
