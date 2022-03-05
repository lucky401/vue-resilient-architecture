const GeneralLayout = () => import('@/layouts/General.vue');

const Module = () => import('./Module.vue');
const Home = () => import('./views/Home.vue');

const moduleRoute = {
  path: '',
  component: GeneralLayout,
  children: [
    {
      path: '/home',
      component: Module,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            public: false,
            title: 'Home',
          },
        },
      ],
    },
  ],
};

export default (router) => {
  router.addRoutes([moduleRoute]);
};
