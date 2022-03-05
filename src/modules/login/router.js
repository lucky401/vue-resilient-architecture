const AuthLayout = () => import('@/layouts/Auth.vue');

const Module = () => import('./Module.vue');
const Login = () => import('./views/Login.vue');

const moduleRoute = {
  path: '',
  component: AuthLayout,
  children: [
    {
      path: '/login',
      component: Module,
      children: [
        {
          path: '/',
          name: 'login',
          component: Login,
          meta: {
            public: true,
            onlyLoggedOut: true,
            title: 'Login',
          },
        },
      ],
    },
  ],
};

export default (router) => {
  router.addRoutes([moduleRoute]);
};
