import {
  getAuth
} from 'src/utils/common'

export default {
  userInfo: null,
  access_token: getAuth('access_token').value || null
}
