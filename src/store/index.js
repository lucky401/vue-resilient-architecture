import Vue from 'vue';
import Vuex from 'vuex';

import root from './modules/root';
import authentication from './modules/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { root, authentication },
});
