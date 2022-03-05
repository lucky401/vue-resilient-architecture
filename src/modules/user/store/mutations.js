import * as TYPES from './types';
import mutator from '@/utils/mutator';

export default {
  /*
   * This is a reducer.
   * It is a function that takes the previous state and an action,
   * and returns the new state.
   */
  [TYPES.SET_STATE]: mutator,
};
