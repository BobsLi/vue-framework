import storage from 'src/utils/storage'

const whiteList = ['/login'] // 不重定向白名单

export default async ({
  router,
  store
}) => {
  router.beforeEach((to, from, next) => {
    console.log(to)
    // 设置页面title, 在需要添加title的router下的meta属性增加title即可
    if (to.meta.title) {
      document.title = to.meta.title
    }
    // 设置权限
    if (storage.get('AUTH')) {
      if (to.path === '/login') {
        next({
          path: '/'
        })
      } else {
        // 有token但state没有用户信息，则获取用户信息
        if (!store.state.user.userInfo) {
          store.dispatch('user/getUserInfo').then((res) => {
            next()
          })
        } else {
          next()
        }
      }
    } else {
      if (to.meta.requiresAuth) {
        if (whiteList.includes(to.path)) {
          next()
        } else {
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  })
}
