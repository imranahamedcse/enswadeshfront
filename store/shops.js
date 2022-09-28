export const state = () => ({
  myshop: {},
  myshops:[]
})

export const getters = {
  getMyShop: (state) => {
    return state.myshop
  },

  myshops: (state) => {
    return state.myshops
  },

}

export const actions = {
  async setMyShop({ commit }, ) {
    let res = await this.$axios.$get(`/api/my-shops/${this.$auth.user.id}`)
    commit('SET_MY_SHOP', res.data)
  },
  async myShopsData({ commit }, ) {
    let res = await this.$axios.$get(`/api/my-shops/self`)
    commit('MY_SHOPS', res.data)
  },
}

export const mutations = {
  SET_MY_SHOP(state, myshop) {
    state.myshop = myshop
  },
  MY_SHOPS(state, myshops) {
    state.myshops = myshops
  },
}
