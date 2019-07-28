import userApi from 'src/api/user-api'
import {
  to
} from 'src/utils/common'

// 保存用户信息到state
// 设置用户登录信息
export function setLoginInfo ({
  commit
}, data) {
  if (data.member) {
    commit('SET_USER_INFO', data.member)
  }
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
    commit('SET_AUTH', auth)
  }
}

// 获取用户信息
export async function getUserInfo ({
  commit,
  dispatch
}) {
  let res = await to(userApi.getUserInfo())
  if (res.data) {
    dispatch('setLoginInfo', res.data)
    return Promise.resolve(true)
  }
}

// 退出登录
export async function logout ({
  commit
}) {
  let res = await userApi.logout()
  if (res) {
    commit('CLEAR_USER_INFO')
    return Promise.resolve(true)
  } else {
    return Promise.reject(res.message)
  }
}
