/**
 * @module vuex/actions
 */
export default {
  /**
   * Mutate the temporary data to a new object
   * @param commit
   * @param {object} newSet
   * @example store.dispatch('temporaryData',object)
   */
  temporaryData({ commit }, newSet) {
    commit('temporaryData', newSet)
  },
  hdData({ commit }, newSet) {
    commit('hdData', newSet)
  },
  neData({ commit }, newSet) {
    commit('neData', newSet)
  },
  reportDate({ commit }, newSet) {
    commit('reportDate', newSet)
  },
}
