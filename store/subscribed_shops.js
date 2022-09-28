export const state = () => ({
  subscribed_shops: {},
})

export const getters = {
  subscribed_shops: (state) => {
    return state.subscribed_shops
  },
}

export const actions = {
  async SetsubscribedData({ commit }, id) {
    let res = await this.$axios.$get(`/api/subscribe-list`)

    commit('SETSUBSCRIBED_SHOPS', res.data.subscribe)
  },
}

export const mutations = {
  SETSUBSCRIBED_SHOPS(state, subscribed_shops) {
    state.subscribed_shops = subscribed_shops
  },
}
