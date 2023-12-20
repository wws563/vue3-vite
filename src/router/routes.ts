const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: '首页', component: () => import('@/view/index.vue') },
  // { path: '/projectSetting',
  //   name:'配置',
  //   component: ()=>import('@/components/layout/routerMiddle.vue'),
  //   children:[
  //     {
  //       path: 'build',
  //       name:'项目构建',
  //       component: ()=>import('@/view/projectSetting/build.vue'),
  //     },
  //     {
  //       path: 'demo2',
  //       name:'示例2',
  //       component: ()=>import('@/view/projectSetting/demo2.vue'),
  //     },
  //     {
  //       path: 'demo3',
  //       name:'示例',
  //       component: ()=>import('@/view/projectSetting/demo3.vue'),
  //     },
  //   ]
  // },
  // {
  //   path: "/plugin",
  //   name: "插件",
  //   component: () => import("@/components/layout/routerMiddle.vue"),
  //   children: [
  //     {
  //       path: "codePan",
  //       name: "代码框",
  //       component: () => import("@/view/plugin/codePan.vue"),
  //     },
  //     {
  //       path: "stackblitz",
  //       name: "可交互环境",
  //       component: () => import("@/view/plugin/stackblitz.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/vue",
  //   name: "Vue3",
  //   component: () => import("@/components/layout/routerMiddle.vue"),
  //   children: [
  //     {
  //       path: "setup",
  //       name: "组合式api（setup）",
  //       component: () => import("@/view/vue/setup.vue"),
  //     },
  //     {
  //       path: "ref",
  //       name: "ref和reactive",
  //       component: () => import("@/view/vue/ref.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/demo",
  //   name: "Demos",
  //   component: () => import("@/components/layout/routerMiddle.vue"),
  //   children: [
  //     {
  //       path: "routeRobot",
  //       name: "机器人巡路",
  //       component: () => import("@/view/demo/routeRobot.vue"),
  //     },
  //   ],
  {
    path: '/toy',
    name: '玩具',
    component: () => import('@/components/layout/pc/routerMiddle.vue'),
    children: [
      {
        path: 'lotterySpinner',
        name: '圆盘抽奖',
        component: () => import('@/view/toy/lotterySpinnerPage.vue'),
      },
    ],
  },
  // },
];

export default routes;
