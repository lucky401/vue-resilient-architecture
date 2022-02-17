import * as TYPES from './types';
import mutator from '@/utils/mutator';

export default {
  [TYPES.SET_STATE]: mutator,

  [TYPES.PRUNE_ERRORS](state) {
    state.errorMessage = {};
    state.errors = {};
  },
};
