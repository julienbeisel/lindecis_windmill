const MAXHIGHPASS = 40000

export const state = () => ({
  highpassValue: MAXHIGHPASS,
})
export const getters = {}

export const mutations = {
  setHighpassValue(state, propValue) {
    state.highpassValue = Math.floor(propValue * MAXHIGHPASS)
  },
}

export const actions = {}
