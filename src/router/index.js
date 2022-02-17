import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import store from '@/store/index';

import * as AUTHENTICATIONTYPES from '@/store-namespace/authentication/types';

const ENVIRONMENT = process.env.ENVIRONMENT || 'local';
const CONFIGENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);

const { meta } = CONFIGENVIRONMENT.env;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
    },
  ].concat(routes),
});

router.beforeEach((to, from, next) => {
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
