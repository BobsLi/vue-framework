import user from './user-routes'

const routes = [{
  path: '/',
  component: () => import('layouts/BaseLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('pages/site/Index.vue')
    },
    {
      name: 'login',
      path: 'login',
      component: () => import('pages/site/Login')
    },
    user,
    {
      path: 'test',
      component: () => import('layouts/TestLayout.vue'),
      children: [{
        path: '',
        alias: 'index',
        component: () => import('pages/test/index.vue')
      }, {
        path: 'button',
        component: () => import('pages/test/ButtonTest.vue')
      }, {
        path: 'pagination',
        component: () => import('pages/test/Pagination.vue')
      }]
    }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
