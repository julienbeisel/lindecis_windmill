const MAXHIGHPASS = 2000
const MAXLOWPASS = 4000
export const state = () => ({
  highpassValue: 0,
  highpassPropValue: 0.5,
  lowpassValue: 0,
  lowpassPropValue: 0.3,
})
export const getters = {}

export const mutations = {
  setHighpassValue(state, propValue) {
    state.highpassPropValue = propValue
    state.highpassValue = Math.floor(propValue * MAXHIGHPASS)
  },
  setLowpassValue(state, propValue) {
    state.lowpassPropValue = propValue
    state.lowpassValue = Math.floor((1 - propValue) * MAXLOWPASS)
  },
}

export const actions = {}
