import state from '@/store-namespace/authentication/state';
import mutations from '@/store-namespace/authentication/mutations';
import actions from '@/store-namespace/authentication/actions';
import getters from '@/store-namespace/authentication/getters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
