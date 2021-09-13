export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // use special layout for dao page only
  // {
  //   path: '/farms',
  //   component: '../layouts/FarmsLayout',
  //   Routes: ['src/pages/Authorized'],
  //   routes: [
  //     { path: '/', redirect: '/exchange' },
  //     {
  //       path: '/market',
  //       name: 'Market',
  //       hideChildrenInMenu: true,
  //       routes: [
  //         {
  //           path: '/market',
  //           component: './Market/Index',
  //         },
  //         {
  //           path: '/market/list/token',
  //           component: './Market/TokenList',
  //         },
  //         {
  //           path: '/market/list/pool',
  //           component: './Market/PoolList',
  //         },
  //         {
  //           path: '/market/info/token/:address',
  //           component: './Market/TokenInfo',
  //         },
  //         {
  //           path: '/market/info/pool/:address',
  //           component: './Market/PoolInfo',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/exchange',
  //       name: 'Exchange',
  //       component: './Swap/Index',
  //     },
  //     {
  //       path: '/liquidity',
  //       name: 'Liquidity',
  //       component: './Liquidity/Index',
  //     },
  //     {
  //       path: '/farms',
  //       name: 'Farms',
  //       component: './Farms/',
  //     },
  //     {
  //       path: '/dao',
  //       name: 'DAO',
  //       component: './Dao/Index',
  //     },
  //   ],
  // },
  // // use special layout for dao page only
  // {
  //   path: '/dao',
  //   component: '../layouts/DaoLayout',
  //   Routes: ['src/pages/Authorized'],
  //   routes: [
  //     { path: '/', redirect: '/exchange' },
  //     {
  //       path: '/market',
  //       name: 'Market',
  //       hideChildrenInMenu: true,
  //       routes: [
  //         {
  //           path: '/market',
  //           component: './Market/Index',
  //         },
  //         {
  //           path: '/market/list/token',
  //           component: './Market/TokenList',
  //         },
  //         {
  //           path: '/market/list/pool',
  //           component: './Market/PoolList',
  //         },
  //         {
  //           path: '/market/info/token',
  //           component: './Market/TokenInfo',
  //         },
  //         {
  //           path: '/market/info/pool',
  //           component: './Market/PoolInfo',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/exchange',
  //       name: 'Exchange',
  //       component: './Swap/Index',
  //     },
  //     {
  //       path: '/liquidity',
  //       name: 'Liquidity',
  //       component: './Liquidity/Index',
  //     },
  //     {
  //       path: '/farms',
  //       name: 'Farms',
  //       component: './Farms/',
  //     },
  //     {
  //       path: '/dao',
  //       name: 'DAO',
  //       component: './Dao/Index',
  //     },
  //   ],
  // },
  // {
  //   path: '/market',
  //   component: '../layouts/MarketLayout',
  //   Routes: ['src/pages/Authorized'],
  //   routes: [
  //     { path: '/', redirect: '/exchange' },
  //     {
  //       path: '/market',
  //       name: 'Market',
  //       hideChildrenInMenu: true,
  //       routes: [
  //         {
  //           path: '/market',
  //           component: './Market/Index',
  //         },
  //         {
  //           path: '/market/list/token',
  //           component: './Market/TokenList',
  //         },
  //         {
  //           path: '/market/list/pool',
  //           component: './Market/PoolList',
  //         },
  //         {
  //           path: '/market/info/token/:address',
  //           component: './Market/TokenInfo',
  //         },
  //         {
  //           path: '/market/info/pool/:address',
  //           component: './Market/PoolInfo',
  //         }
  //       ]
  //     },
  //     {
  //       path: '/exchange',
  //       name: 'Exchange',
  //       component: './Swap/Index',
  //     },
  //     {
  //       path: '/liquidity',
  //       name: 'Liquidity',
  //       component: './Liquidity/Index',
  //     },
  //     {
  //       path: '/farms',
  //       name: 'Farms',
  //       component: './Farms/',
  //     },
  //     {
  //       path: '/dao',
  //       name: 'DAO',
  //       component: './Dao/Index',
  //     },
  //   ],
  // },
  // // the rest of the pages except dao uses basic layout
  // {
  //   path: '/liquidity',
  //   component: '../layouts/LiquidityLayout',
  //   Routes: ['src/pages/Authorized'],
  //   routes: [
  //     { path: '/', redirect: '/exchange' },
  //     {
  //       path: '/market',
  //       name: 'Market',
  //       hideChildrenInMenu: true,
  //       routes: [
  //         {
  //           path: '/market',
  //           component: './Market/Index',
  //         },
  //         {
  //           path: '/market/list/token',
  //           component: './Market/TokenList',
  //         },
  //         {
  //           path: '/market/list/pool',
  //           component: './Market/PoolList',
  //         },
  //         {
  //           path: '/market/info/token',
  //           component: './Market/TokenInfo',
  //         },
  //         {
  //           path: '/market/info/pool',
  //           component: './Market/PoolInfo',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/exchange',
  //       name: 'Exchange',
  //       component: './Swap/Index',
  //     },
  //     {
  //       path: '/liquidity',
  //       name: 'Liquidity',
  //       component: './Liquidity/Index',
  //     },
  //     {
  //       path: '/farms',
  //       name: 'Farms',
  //       component: './Farms/',
  //     },
  //     {
  //       path: '/dao',
  //       name: 'DAO',
  //       component: './Dao/Index',
  //     },
  //   ]
  // },
  // the rest of the pages except dao uses basic layout
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/exchange' },
      {
        path: '/market',
        name: 'Market',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/market',
            component: './Market/Index',
          },
          {
            path: '/market/list/token',
            component: './Market/TokenList',
          },
          {
            path: '/market/list/pool',
            component: './Market/PoolList',
          },
          {
            path: '/market/info/token/:address',
            component: './Market/TokenInfo',
          },
          {
            path: '/market/info/pool/:address',
            component: './Market/PoolInfo',
          },
        ],
      },
      {
        path: '/exchange',
        name: 'Exchange',
        component: './Swap/Index',
      },
      {
        path: '/liquidity',
        name: 'Liquidity',
        component: './Liquidity/Index',
      },
      {
        path: '/farms',
        name: 'Farms',
        component: './Farms/',
      },
      {
        path: '/dao',
        name: 'DAO',
        component: './Dao/Index',
      },

      // {
      //   path: '/swap',
      //   name: 'Swap',
      //   component: './Swap/Index',
      // },
      // {
      //   path: '/add',
      //   name: 'Add',
      //   component: './Add/Index',
      // },
      // {
      //   path: '/remove',
      //   name: 'Remove',
      //   component: './Remove/Index',
      // },
      // {
      //   path: '/dashboard/monitor',
      //   name: 'Liquidity',
      //   component: './Dashboard/Monitor',
      // },
      // // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      // {
      //   path: '/dashboard',
      //   name: 'Market',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   component: '404',
      // },
    ],
  },
];
