const MAXHIGHPASS = 2000

export const state = () => ({
  highpassValue: 0,
})
export const getters = {}

export const mutations = {
  setHighpassValue(state, propValue) {
    state.highpassValue = Math.floor(propValue * MAXHIGHPASS)
  },
}

export const actions = {}
