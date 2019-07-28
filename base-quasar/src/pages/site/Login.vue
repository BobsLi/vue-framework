<template>
  <q-page padding class="row justify-center">
    <div>
      <div>
        <div>
          <label for="name">用户名</label>
          <input type="text" name="name" v-model="username">
        </div>
        <div>
          <label for="password">密码</label>
          <input type="password" name="password" v-model="password">
        </div>
        <q-btn color="primary" outline class="login-btn" @click="userLogin">登录</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  mapActions
} from 'vuex'
import {
  Notify
} from 'quasar'
import userApi from 'src/api/user-api'
import {
  to
} from 'src/utils/common'

export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  computed: {},
  methods: {
    ...mapActions('user', [
      'setLoginInfo'
    ]),
    async userLogin () {
      if (!this.username) {
        Notify.create({
          message: '请输入姓名',
          type: 'negative'
        })
        return
      }
      if (!this.password) {
        Notify.create({
          message: '请输入密码',
          type: 'negative'
        })
        return
      }
      let {
        data,
        code
      } = await to(userApi.login(this.username, this.password))
      if (code === 200) {
        this.setLoginInfo(data)
        this.$router.push({
          path: this.redirect || '/'
        })
      }
    }
  }
}
</script>

<style>
</style>
