<template>
  <q-page padding>
    <q-btn color="primary" label="test api" @click="test" />
  </q-page>
</template>

<script>
import userApi from 'src/api/user-api'
import { to } from 'src/utils/common'

export default {
  name: 'testIndex',
  methods: {
    async test () {
      let res = await to(userApi.test())
      console.log(res)
    }
  }
}
</script>

<style></style>
