export const state = () => ({
  brands: [],
})

export const getters = {
  brands: (state) => {
    return state.brands
  },
  getProduct: (state) => {
    return state.product
  },
}

export const actions = {
  async BrandData({ commit }) {
    await this.$axios.get('/api/brands').then((response) => {
      commit('SET_BRAND', response.data.data)
    })
  },
  async brandCreated({ commit }, data) {
    let response = await this.$axios.post('/api/brands/create', data)
    commit('CREATED_BRAND', response.data.data)
  },
}

export const mutations = {
  SET_BRAND(state, brands) {
    state.brands = brands
  },
  CREATED_BRAND(state) {},
}
