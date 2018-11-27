import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'store'
  })],
  state: {
    username: '',
    userMessages: {}
  },
  getters: {
    messages (state) {
      if (!state.username || !state.userMessages[state.username]) {
        return []
      }
      return state.userMessages[state.username]
    }
  },
  mutations: {
    addMessage (state, message) {
      if (!state.userMessages[state.username]) {
        state.userMessages[state.username] = []
      }
      state.userMessages[state.username].push(message)
    },
    setUsername (state, username) {
        state.username = username
    }
  }
})