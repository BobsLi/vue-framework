import {
  service as fetch
} from 'boot/axios'
import {
  to
} from 'src/utils/common'

// 刷新token
export function refreshToken (refreshToken) {
  console.log(refreshToken)
  let data = {
    refresh_token: refreshToken
  }
  return fetch({
    url: '/site/refresh',
    method: 'post',
    data
  })
}

// 分页获取数据api
export function GetpagiantionData (url, data) {
  let params = {
    ...data
  }
  return to(fetch({
    url: url,
    method: 'get',
    params
  }))
}
