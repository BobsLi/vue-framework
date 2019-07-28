import storage from './storage'

// 获取token和refresh_token, type="all"，；同时获取token和refresh_token
export function getAuth (type = 'access_token') {
  const auth = storage.get('AUTH')
  if (!auth) {
    return false
  }
  if (type === 'all') {
    return auth
  } else {
    return auth[type] || false
  }
}

// 判断刷新token是否过期
export function isRefreshTokenExpired () {
  let refreshToken = getAuth('refresh_token')
  if (!refreshToken) {
    return true
  }
  let expiredTime = refreshToken.expired_at
  let nowTime = new Date().getTime() / 1000
  // 检验本地时间差
  return expiredTime < nowTime
}

// 判断token是否临近过期
export function isTokenExpired () {
  let token = getAuth('access_token')
  if (!token) {
    return false
  }
  let expiredTime = token.expired_at
  let nowTime = new Date().getTime() / 1000
  // 检验本地时间差
  return ((expiredTime - nowTime) < 10 * 60 && (expiredTime - nowTime) > 0)
}

// 包装promise，使其返回统一的格式的代码
export function to (promise) {
  return promise.then((res) => {
    return res
  }).catch((error) => {
    return error
  })
}

export function isEmpty (obj) {
  if (!obj) {
    return true
  } else if (obj instanceof Array) {
    return obj.length === 0
  } else if (obj instanceof Object) {
    return JSON.stringify(obj) === '{}'
  }
}
