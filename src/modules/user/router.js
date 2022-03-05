const GeneralLayout = () => import('@/layouts/General.vue');

const Module = () => import('./Module.vue');
const UserList = () => import('./views/UserList.vue');

const moduleRoute = {
  path: '',
  component: GeneralLayout,
  children: [
    {
      path: '/users',
      component: Module,
      children: [
        {
          path: '/',
          name: 'user-list',
          component: UserList,
          meta: {
            public: false,
            title: 'User List',
          },
        },
      ],
    },
  ],
};

export default (router) => {
  router.addRoutes([moduleRoute]);
};
