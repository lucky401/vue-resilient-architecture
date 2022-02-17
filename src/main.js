import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import '@/assets/css/main.css';

import Portal from './plugins/portal';
import Convert from './plugins/convert';
import VeeValidate from './plugins/veeValidate';
import VueApexCharts from './plugins/VueApexCharts';

new Vue({
  router,
  store,
  vuetify,
  Portal,
  Convert,
  VeeValidate,
  VueApexCharts,
  render: (h) => h(App),
}).$mount('#app');
