<template>
  <q-layout view="lHh Lpr lFf">
    <Header></Header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer></Footer>
  </q-layout>
</template>

<script>
import Header from 'layouts/HeaderLayout'
import Footer from 'layouts/FooterLayout'

export default {
  name: 'BaseLayout',
  components: {
    Header,
    Footer
  },
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style>
</style>
