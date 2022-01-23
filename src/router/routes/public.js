const Login = () =>
  import(/* webpackChunkName: "dashboard.Login" */ '@/views/public/Login.vue');

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    onlyLoggedOut: true,
    meta: {
      title: 'Login',
    },
  },
];
export default routes.map((route) => {
  const meta = {
    public: true,
    title: route.meta.title,
    onlyLoggedOut: route.onlyLoggedOut,
  };
  return { ...route, meta };
});
