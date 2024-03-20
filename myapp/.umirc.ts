import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/home/list' },
    {
      path: '/home', component: '@/pages/home/index',
      routes: [
        { path: '/home/list', component: '@/pages/list/index' },
        { path: '/home/door', component: '@/pages/door/index' },


      ]
    },


  ],
  fastRefresh: {},
  mfsu: {}
});
