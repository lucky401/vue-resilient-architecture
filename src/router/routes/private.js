const Home = () =>
  import(/* webpackChunkName: "dashboard.Home" */ '@/views/private/Home.vue');

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
];

export default routes.map((route) => {
  const meta = {
    public: false,
    title: route.meta.title,
  };
  return { ...route, meta };
});
