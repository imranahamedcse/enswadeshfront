export const state = () => ({
  floorIds: 0
})
export const getters = {
  floorIds: (state) => state.floorIds,
}

export const actions = {
  async getFloorId({ commit }, floorIds) {
    commit('SET_FLOOR_ID', floorIds)
  }
}

export const mutations = {
   SET_FLOOR_ID(state, floorIds) {
    state.floorIds = floorIds
  },
}
