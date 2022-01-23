import state from '@/store-namespace/root/state';
import mutations from '@/store-namespace/root/mutations';
import actions from '@/store-namespace/root/actions';
import getters from '@/store-namespace/root/getters';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
