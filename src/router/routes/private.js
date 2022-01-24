const Home = () =>
  import(/* webpackChunkName: "dashboard.Home" */ '@/views/private/Home.vue');

const routes = [
  {
    path: '/summary',
    name: 'summary',
    component: Home,
    meta: {
      title: 'Summary',
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
