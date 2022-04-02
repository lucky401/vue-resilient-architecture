import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '@/assets/css/main.css';

import { registerModules } from './register-modules';

import userModule from './modules/user';
import homeModule from './modules/home';
import loginModule from './modules/login';

/* This is a way to register the modules that are used in the application. */
registerModules({
  home: homeModule,
  user: userModule,
  login: loginModule,
});

import Portal from './plugins/portal';
import vuetify from './plugins/vuetify';
import Convert from './plugins/convert';
import VeeValidate from './plugins/veeValidate';
import VueApexCharts from './plugins/VueApexCharts';
import Toast from './plugins/VueToast';
import VueCurrencyFilter from './plugins/VueCurrencyFilter';

/* This is a way to print out the version number of the application. */
import { log } from './utils/console';
const package_json = require('../package.json');

log(`Version v${package_json.version}`, 'info');

const ENVIRONMENT = process.env.VUE_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);
const { environment } = CONFIG_ENVIRONMENT.env;
if (environment !== 'production') {
  log(`Environment: ${environment}`, 'warning');
}

new Vue({
  router,
  store,
  Toast,
  Portal,
  Convert,
  vuetify,
  VeeValidate,
  VueApexCharts,
  VueCurrencyFilter,
  render: (h) => h(App),
}).$mount('#app');
