export const state = () => ({
  // products: [],
  similar_product: [],
  units: [],
  product: {},
  product_preview:{},
})

export const getters = {
  // products: (state) => {
  //   return state.products
  // },
  units: (state) => {
    return state.units
  },
  similar_product: (state) => {
    return state.similar_product
  },
  getProduct: (state) => {
    return state.product
  },
  getProductPreviewData: (state) => {
    return state.product_preview
  }
}

export const actions = {
  // async addProducts({ commit }, products) {
  //   let response = await this.$axios.post('/api/products/', products, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   commit('SET_PRODUCTS', response.data)
  // },
  async unitsData({ commit }) {
    let response = await this.$axios.get('/api/units')
    commit('UNITS_DATA', response.data.data)
  },
  async similarProduct({ commit }, id) {
    let response = await this.$axios.get(`/api/products/similar-product/${id}`)
    commit('SIMILAR_PRODUCT', response.data.data.data)
  },

  async getSingleProduct({ commit }, id) {
    let res = await this.$axios.$get(`/api/products/${id}`)

    commit('SET_SINGLE_PRODUCT', res.data)
  },

  async productPreview({ commit }, previewData) {
    commit('SET_PRODUCT_PREVIEW_DATA', previewData)
  }
}

export const mutations = {
  // SET_PRODUCTS(state, products) {
  //   state.products = products
  // },
  UNITS_DATA(state, units) {
    state.units = units
  },
  SIMILAR_PRODUCT(state, similar_product) {
    state.similar_product = similar_product
  },
  SET_SINGLE_PRODUCT(state, product) {
    state.product = product
  },
  SET_PRODUCT_PREVIEW_DATA(state, previewData) {
    state.product_preview = previewData
  }
}
