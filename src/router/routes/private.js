const GeneralLayout = () =>
  import(
    /* webpackChunkName: "dashboard.GeneralLayout" */ '@/layouts/General.vue'
  );

const Home = () =>
  import(/* webpackChunkName: "dashboard.Home" */ '@/views/private/Home.vue');

const routes = [
  {
    path: '',
    component: GeneralLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: 'Home',
        },
      },
    ],
  },
];

export default routes.map((route) => {
  const meta = {
    public: false,
  };
  return { ...route, meta };
});
