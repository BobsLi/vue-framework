<template>
  <q-page padding>
    <div>
      <q-input filled v-model="text" label="Filled" class="j-field"/>
    </div>
    <div style="margin: 15px auto;">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(item, index) in list" :key="index">
          <q-item-section>{{item.username}}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <Pagination @give-data="changList"></Pagination>
  </q-page>
</template>

<script>
import Pagination from 'components/Pagination.vue'
import { GetpagiantionData } from 'src/api/common-api'

export default {
  name: 'pagination-test',
  data () {
    return {
      list: [],
      text: '11123'
    }
  },
  components: {
    Pagination
  },
  methods: {
    changList (data) {
      this.list = data
    }
  },
  created () {
    GetpagiantionData('/user/list', {})
      .then(res => {
        this.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {}
}
</script>

<style>
</style>
