import storage from 'src/utils/storage'

// 设置用户信息
export function SET_USER_INFO (state, userInfo) {
  if (!userInfo.head_portrait) {
    if (userInfo.gender === '1') {
      userInfo.head_portrait = '/statics/user/avatar-male.png'
    } else if (userInfo.gender === '2') {
      userInfo.head_portrait = '/statics/user/avatar-female.png'
    } else {
      userInfo.head_portrait = '/statics/user/avatar-default.jpg'
    }
  }
  state.userInfo = userInfo
  storage.set('UID', userInfo.id)
}

// 设置token
export function SET_AUTH (state, auth) {
  state.access_token = auth.access_token.value
  storage.set('AUTH', auth)
}

// 清除登录用户信息
export function CLEAR_USER_INFO (state) {
  state.userInfo = null
  state.access_token = null
  storage.del('AUTH')
  storage.del('UID')
}
