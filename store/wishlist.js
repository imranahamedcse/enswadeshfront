export const state = () => ({
  product: null,
})

export const getters = {
  product: (state) => {
    return state.product
  }
}

export const actions = {
  async wishlistProduct({ commit }, id) {
    await this.$axios.get('/api/wishlist-check-by-product/' + id).then((response) => {
      commit('SET_PRODUCT', response.data)
    })
  }
}

export const mutations = {
  SET_PRODUCT(state, product) {
    state.product = product
  }
}
