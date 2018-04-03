const IndexPage = () => import('./pages/IndexPage').then(r => r.default);
const AboutPage = () => import('./pages/AboutPage').then(r => r.default);

export default [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
];
