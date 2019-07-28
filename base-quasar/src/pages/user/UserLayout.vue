<template>
  <div class="user-layout">
    <div class="banner">
      <div class="switch-tab">
        <div class="tab active">
          <div class="icon"></div>
          <div class="label">基本设置</div>
        </div>
        <div class="tab">
          <div class="icon"></div>
          <div class="label">健康操作系统</div>
        </div>
      </div>
    </div>
    <q-page class="main">
      <div class="content">
        <router-view />
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  name: 'userLayout'
}
</script>

<style lang="stylus" scoped></style>
