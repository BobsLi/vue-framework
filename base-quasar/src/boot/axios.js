import axios from 'axios'
import {
  getAuth,
  isRefreshTokenExpired,
  isTokenExpired
} from 'src/utils/common'
import storage from 'src/utils/storage'
import {
  refreshToken
} from 'src/api/common-api'
import {
  Notify,
  LoadingBar
} from 'quasar'

LoadingBar.setDefaults({
  color: 'blue'
})

window.isRefreshing = false // 是否有请求正在刷新token
let refreshSubscribers = [] // 被挂起的请求数组
const API_ROOT = process.env.API_ROOT

// push所有请求到数组中
function subscribeTokenRefresh (cb) {
  refreshSubscribers.push(cb)
}

// 刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据
function onRrefreshed (token) {
  refreshSubscribers.map(cb => cb(token))
}

// axios网络封装请求开始
const service = axios.create({
  baseURL: API_ROOT,
  timeout: 5000
})

export default async ({
  Vue,
  store,
  router
}) => {
  // 拦截网络请求开始
  service.interceptors.request.use(
    config => {
      LoadingBar.increment(0.5)
      LoadingBar.start()
      // 获取登录时存储的sessionStorage
      const tokenObj = getAuth('access_token')
      let headers = {}
      // 判断token所否存在，如果存在，就给请求头加上token
      if (tokenObj) {
        headers.Authorization = `Bearer ${tokenObj.value}`
        // 判断刷新token请求的refresh_token是否过期
        if (isRefreshTokenExpired()) {
          Notify.create({
            message: '刷新token已过期，请重新登录',
            type: 'negative'
          })
          storage.del('AUTH')
          store.dispatch('user/logout').then((res) => {
            router.push('/login')
          })
          return config
        }

        // 判断token是否将要过期或者是后台主动请求刷新token
        if ((isTokenExpired() && config.url.indexOf('refresh') === -1)) {
          // 判断是否正在刷新
          if (!window.isRefreshing) {
            // 将刷新token的标志置为true
            window.isRefreshing = true
            let refreshTokenObj = getAuth('refresh_token')
            if (refreshTokenObj) {
              // 发起刷新token请求
              refreshToken(refreshTokenObj.value).then((res) => {
                // 将刷新token的标志置为false
                window.isRefreshing = false
                config.headers.Authorization = `Bearer ${res.data.auth.token.value}`
                store.commit('user/SET_AUTH', res.data.auth)
                // 执行刷新token期间挂载的api请求
                onRrefreshed(res.data.auth.token.value)
                // 执行onRefreshed函数后清空数组中保存的请求
                refreshSubscribers = []
              }).catch((error) => {
                console.log(error)
                // token刷新失败后的其它操作
                Notify.create({
                  message: 'token刷新失败，请重新登录',
                  type: 'negative'
                })
                store.commit('user/CLEAR_USER_INFO')
                router.push('/login')
              })
            }
          }

          // 把token刷新期间的每一个请求都放在数组中
          let retry = new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              config.headers.Authorization = `Bearer ${token}`
              // 将请求挂起
              resolve(config)
            })
          })
          return retry
        }
      }

      // 检测如果请求为post，进行转换为JSON字符串（一般情况下不需要）
      if (config.method === 'post') {
        config.data = Object.assign({}, config.data, {
          group: 'app'
        })
      }

      // 设置请求头
      // 请求头常见的有以下几种方式，可根据需要自行修改
      // ’application/json’,’application/x-www-form-urlencoded’,’multipart/form-data’
      // Axios默认为’application/json’
      headers['Content-Type'] = 'application/json'
      // 合并header头
      config.headers = Object.assign({}, config.headers, headers)
      return config
    },
    error => {
      console.log('request error', error)
      Notify.create({
        message: error,
        type: 'negative'
      })
      // 请求错误消息提示
      return Promise.reject(error)
    })

  // response响应请求拦截器
  service.interceptors.response.use(
    response => {
      console.log(response)
      LoadingBar.stop()
      // 对服务器端响应header进行操作
      let {
        headers,
        config
      } = response
      if (headers && config) {
        let totalCount = parseInt(headers['x-pagination-total-count']) // 总数量
        let pageSize = parseInt(headers['x-pagination-page-count']) // 总页数
        let page = parseInt(headers['x-pagination-current-page']) || 1 // 当前页数
        let perPage = parseInt(headers['x-pagination-per-page']) // 每页数量
        let url = config.url // 请求的url
        let baseURL = config.baseURL
        if (totalCount && pageSize && page && perPage && url) {
          // 如果存在baseURL，就将url中的baseURL替换掉
          if (url.includes(baseURL)) {
            url = url.replace(baseURL, '')
          }
          // 提交分页信息
          store.commit('common/SET_PAGINATION', {
            url,
            totalCount,
            pageSize,
            page,
            'per-page': perPage
          })
        }
      }

      // 对服务器端响应的数据进行操作
      let {
        code,
        message,
        data
      } = response.data
      if (code === 200) {
        // 如果存在token，则代表需要刷新token
        if (data.refresh_token && data.access_token) {
          let auth = {
            access_token: {
              value: data.access_token,
              expired_at: data.expiration_time + Math.round((new Date().getTime() / 1000))
            },
            refresh_token: {
              value: data.refresh_token,
              expired_at: data.refresh_expiration_time + Math.round((new Date().getTime() / 1000))
            }
          }
          store.commit('user/SET_AUTH', auth)
        }
        return Promise.resolve(response.data)
      } else if (code === 401) { // token过期或者无效
        console.log('马上刷新token')
        window.isRefreshing = true
        let refreshTokenObj = getAuth('refresh_token')
        if (refreshTokenObj) {
          console.log(refreshTokenObj)
          // 发起刷新token请求
          refreshToken(refreshTokenObj.value).then((res) => {
            console.log('token刷新成功:', res)
            // 将刷新token的标志置为false
            window.isRefreshing = false
            store.dispatch('user/setLoginInfo', res.data)
            // 执行刷新token期间挂载的api请求
            onRrefreshed(res.data.access_token)
            // 执行onRefreshed函数后清空数组中保存的请求
            refreshSubscribers = []
            return Promise.resolve(res)
          }).catch((error) => {
            console.log(error)
            // token刷新失败后的其它操作
            Notify.create({
              message: 'token刷新失败，请重新登录',
              type: 'negative'
            })
            store.commit('user/CLEAR_USER_INFO')
            router.push('/login')
            return Promise.resolve(error)
          })
          return Promise.reject(response.data)
        } else {
          // localstorage 不存在refresh token
          Notify.create({
            message: '登录状态过期，请重新登录',
            type: 'negative'
          })
          store.commit('user/CLEAR_USER_INFO')
          router.push('/login')
          return
        }
      } else if (code === 429) { // 刷新token失败
        Notify.create({
          message: '您的操作太频繁了，请稍后再试',
          type: 'negative'
        })
      } else {
        console.log(message)
        // 请求错误消息提示
        // Notify.create({
        //   message: message,
        //   type: 'negative'
        // })
      }
      return Promise.reject(response.data)
    },
    error => {
      console.log(error)
      if (error.response) {
        const {
          status,
          statusText
        } = error.response
        Notify.create({
          message: `errorCode: ${status};message: ${statusText}`,
          type: 'negative'
        })
      } else if (error.request) {
        console.log('请求已发出，但未收到响应', error.request)
        Notify.create({
          message: '请求已发出，但未收到响应',
          type: 'negative'
        })
      } else {
        Notify.create({
          message: error.message,
          type: 'negative'
        })
      }
      return Promise.reject(error)
    })

  Vue.prototype.$axios = service
}

export {
  service
}
