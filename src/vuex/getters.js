/**
 * @module vuex/getters
 */
export default {
  /**
   * Get the state for temporary data what you had store
   * @param state - from vuex/state
   * @example let state = store.getters.temporaryData
   */
  temporaryData: (state) => { return state.temporaryData },
  hdData: (state) => { return state.hdData },
  neData: (state) => { return state.neData },
  reportDate: (state) => { return state.reportDate },
}
