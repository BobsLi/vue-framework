<template>
  <div class="pagination-box">
    <template v-if="pagination">
      <div class="row">
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="currentPage"
            :max-pages="maxPages"
            :max="pagination.pageSize"
            :input="false"
            @input="getPaginationData"
            :direction-links="directionLinks"
            :boundary-links="boundaryLinks"
            :boundary-numbers="boundaryNumbers"
          ></q-pagination>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetpagiantionData } from 'src/api/common-api'

export default {
  name: 'paginationComponent',
  data () {
    return {
      currentPage: 1,
      maxPages: 6
    }
  },
  props: {
    // 是否显示上下页指针
    directionLinks: {
      type: Boolean,
      default: true
    },
    // 是否显示点击到第一页或者最后一页指针
    boundaryLinks: {
      type: Boolean,
      default: false
    },
    // 是否显示点击到第一页或者最后一页指针
    boundaryNumbers: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState('common', ['pagination'])
  },
  methods: {
    async getPaginationData (value) {
      console.log('input', value)
      let pagination = this.pagination
      let params = Object.assign(
        {},
        {
          'per-page': pagination['per-page']
        },
        {
          page: value
        }
      )
      let { data, code, message } = await GetpagiantionData(
        this.pagination.url,
        params
      )
      console.log(data, code, message)
      if (code === 200 && data) {
        this.$emit('give-data', data)
      }
    }
  },
  created () {
    if (this.pagination) {
      let { statePage } = this.pagination // state保存的服务器传的当前页
      statePage = Math.ceil(statePage)
      this.currentPag = statePage > 0 ? statePage : 1
    }
  }
}
</script>

<style lang="styl">
  .pagination-box
    .q-pagination
      .q-btn
        line-height 1.42857143
        width 30px
        height 30px
        border-radius 4px
        margin 0 5px
        &:before
          display none !important
        .q-icon
          font-size 24px
        &.text-primary
          color $dark-color !important
</style>
