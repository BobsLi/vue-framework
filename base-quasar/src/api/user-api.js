import {
  service as fetch
} from 'boot/axios'
import { to } from 'src/utils/common'

const user = {
  // 登录获取用户信息和权限
  login (username, password) {
    let data = {
      username,
      password,
      group: 'app'
    }
    return fetch({
      url: '/site/login',
      method: 'post',
      data
    })
  },
  // 获取登录用户信息
  getUserInfo () {
    let params = {}
    return fetch({
      url: `/user/info`,
      method: 'get',
      params
    })
  },
  // 退出登录
  logout () {
    let data = {}
    return fetch({
      url: '/site/logout',
      method: 'post',
      data
    })
  },

  // 获取微信绑定码
  getWechatQR (type) {
    let params = { type: type }
    return to(fetch({
      url: '/user/wechat-qr',
      method: 'get',
      params
    }))
  },

  // 获取正在进行中的健康风控
  getHealCtrlOngoing () {
    let params = {}
    return to(fetch({
      url: '/user/health-control-ongoing',
      method: 'get',
      params
    }))
  },

  // 获取采集器列表
  getCollector () {
    let params = {}
    return to(fetch({
      url: '/user/collector',
      method: 'get',
      params
    }))
  }
}

export default user
