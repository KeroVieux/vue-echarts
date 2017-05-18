/**
 * Created by PetitKero on 30/9/2016.
 */
const mutations = {
  temporaryData(state, newSet) {
    _.assign(state, {
      temporaryData: newSet,
    })
  },
  hdData(state, newSet) {
    _.assign(state, {
      hdData: newSet,
    })
  },
  neData(state, newSet) {
    _.assign(state, {
      neData: newSet,
    })
  },
  reportDate(state, newSet) {
    _.assign(state, {
      reportDate: newSet,
    })
  },
}

export default mutations
