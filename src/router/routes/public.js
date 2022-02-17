const AuthLayout = () =>
  import(/* webpackChunkName: "dashboard.AuthLayout" */ '@/layouts/Auth.vue');

const Login = () =>
  import(/* webpackChunkName: "dashboard.Login" */ '@/views/public/Login.vue');

const routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          onlyLoggedOut: true,
          title: 'Login',
        },
      },
    ],
  },
];
export default routes.map((route) => {
  const meta = {
    public: true,
  };
  return { ...route, meta };
});
