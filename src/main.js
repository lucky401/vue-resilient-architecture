import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import VeeValidate from './plugins/veeValidate';

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  render: (h) => h(App),
}).$mount('#app');
