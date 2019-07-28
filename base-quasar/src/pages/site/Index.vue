<template>
  <q-page class="flex flex-center">
    <div class="absolute lagout-btn">
      <q-btn v-if="userInfo" class="float-right" color="primary" label="退出登录" @click="logout"></q-btn>
      <q-btn v-else class="float-right" color="primary" label="前往登录" @click="login"></q-btn>
    </div>
    <div class="row">
      <q-card inline padding class="q-ma-sm">
        <q-card-section>
          <template v-if="userInfo">
            <h5>登录信息</h5>
            <p class="username">用户：{{ userInfo.username }}</p>
            <p class="username">token：{{ token }}</p>
          </template>
          <p class="" v-else>用户还未登陆</p>
          <div>
            <input type="search" value="123131"/>
          </div>
          <ul>
            <li>1</li>
            <li>1</li>
          </ul>
        </q-card-section>
      </q-card>
    </div>

    <div class="row">
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="5" :input="false" @click="changePage()">
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import {
  mapState
}
  from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      current: 3
    }
  },
  computed: {
    ...mapState('user', [
      'userInfo',
      'token'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        location.reload()
      })
    },
    login () {
      this.$router.push({ name: 'login' })
    },
    changePage (e) {
      console.log(e)
    }
  }
}
</script>

<style>
  .lagout-btn {
    top: 10px;
    right: 10px;
  }
</style>
