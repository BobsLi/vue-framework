const storage = {
  check () {
    if (window.localStorage) {
      return window.localStorage
    } else {
      return false
    }
  },
  set (key, value) {
    key = key.trim()
    let storage = this.check()
    if (!storage) {
      return false
    }
    storage.setItem(key, JSON.stringify(value))
    return true
  },
  get (key) {
    key = key.trim()
    let storage = this.check()
    if (!storage) {
      return null
    }
    let storageStr = storage.getItem(key)
    if (storageStr) {
      return JSON.parse(storageStr)
    } else {
      return null
    }
  },
  del (key) {
    key = key.trim()
    let storage = this.check()
    if (!storage) {
      return false
    }
    storage.removeItem(key)
    return true
  },
  clear () {
    let storage = this.check()
    if (!storage) {
      return false
    }
    storage.clear()
    return true
  }
}

export default storage
