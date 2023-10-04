global.crypto = {
  randomUUID: () => "12345678-62cb-11ee-8c99-0242ac120002",
}
global.localStorage = getLocalStorageMock()

function getLocalStorageMock() {
  let store = {}

  return {
    getItem(key) {
      return store[key]
    },

    setItem(key, value) {
      store[key] = value
    },

    clear() {
      store = {}
    },

    removeItem(key) {
      delete store[key]
    },

    getAll() {
      return store
    },
  }
}
