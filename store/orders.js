export const state = () => ({
  shoporders: [],
  order:{},
})

export const getters = {
  getOrdersByShop: (state) => {
    return state.shoporders
  },
  getOrder: (state) => {
    return state.order
  }
}

export const actions = {
  async setOrdersByShop({ commit }, id) {
    let res = await this.$axios.$get(`/api/orders/shop/${id}`)
    commit('SET_SHOP_ORDERS', res.data)
  },
  async setOrder ({ commit }, id) {
    let res = await this.$axios.$get(`/api/orders/${id}`)
    commit('SET_ORDER', res.data)
  }
}

export const mutations = {
  SET_SHOP_ORDERS(state, shoporders) {
    state.shoporders = shoporders
  },
  SET_ORDER(state, order) {
    state.order = order
  }
}
