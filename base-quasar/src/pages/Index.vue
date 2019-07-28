<template>
  <q-page class="flex flex-center">
    <div class="absolute lagout-btn">
      <q-btn class="float-right" color="primary" label="退出登录" @click="logout">
      </q-btn>
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
        </q-card-section>
      </q-card>
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
