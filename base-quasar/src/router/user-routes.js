export default {
  path: 'user',
  component: () => import('pages/user/UserLayout.vue'),
  redirect: '/user/info',
  children: [{
    path: 'info',
    component: () => import('pages/user/Info.vue'),
    meta: {
      requiresAuth: true
    }
  }]
}
