const routes = [
  {
    path: '/',
    redirect: '/trust-other/vue3'
  },
  { path: '/trust-other/vue3', name: 'home', component: () => import(/* webpackChunkName: "home" */ '@/views/Home') },
  { path: '/trust-other/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/About') },
];

export default routes;
