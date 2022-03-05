import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import * as AUTHENTICATIONTYPES from '../store-namespace/authentication/types';

const ENVIRONMENT = process.env.VUE_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);

const { meta } = CONFIG_ENVIRONMENT.env;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: '/',
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    return next({ name: 'home' });
  }

  const authenticated =
    store.getters[`authentication/${AUTHENTICATIONTYPES.GET_IS_AUTHENTICATED}`];
  const onlyLoggedOut = to.matched.some((record) => record.meta.onlyLoggedOut);
  const isPublic = to.matched.some((record) => record.meta.public);

  if (!isPublic && !authenticated) {
    return next({ name: 'login' });
  }

  if (authenticated && onlyLoggedOut) {
    return next({ name: 'home' });
  }

  document.title = `${meta.title} | ${to.meta.title}`;
  next();
});

export default router;
