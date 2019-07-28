<template>
  <q-page>
    <div class="nav-link">
      <RouterLink to="/test/index">index</RouterLink>
      <RouterLink to="/test/button">button</RouterLink>
      <RouterLink to="/test/pagination">pagination</RouterLink>
    </div>
    <!-- This is where pages get injected -->
    <router-view />
  </q-page>
</template>

<script>
export default {
  name: 'TestLayout',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.nav-link
  font-size: 1.6rem;

  a
    padding 0 1rem
</style>
