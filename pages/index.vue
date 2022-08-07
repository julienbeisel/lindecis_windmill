<template>
  <div :style="currGradientStyle">
    <ToneAbstract />
  </div>
</template>

<script>
const colors = [
  {
    start: [62, 31, 71],
    stop: [101, 76, 108],
  },
  {
    start: [33, 47, 69],
    stop: [11, 82, 91],
  },
]
export default {
  name: 'MainPage',
  data() {
    return {
      colors, // colors array
      step: 0,
      currIdx: 0,
      nextIdx: 1,
      totalSteps: 228,
      rgbValues: { start: [0, 0, 0], stop: [0, 0, 0] }, // values for gradient
      rgbSteps: { start: [0, 0, 0], stop: [0, 0, 0] }, // steps
      col1: null,
      col2: null,

      currGradientStyle: {
        backgroundImage: null,
      },
    }
  },
  beforeMount() {
    this.calcSteps()
    window.requestAnimationFrame(this.updateGradient)
  },
  mounted() {},

  methods: {
    nextStep(n) {
      return n + 1 < colors.length ? n + 1 : 0
    },
    calcStepSize(a, b) {
      return (a - b) / this.totalSteps
    },
    calcSteps() {
      for (const key in this.rgbValues) {
        if (this.rgbValues) {
          for (let i = 0; i < 3; i++) {
            this.rgbValues[key][i] = this.colors[this.currIdx][key][i]
            this.rgbSteps[key][i] = this.calcStepSize(
              this.colors[this.nextIdx][key][i],
              this.rgbValues[key][i]
            )
          }
        }
      }
    },
    updateGradient() {
      for (const key in this.rgbValues) {
        if (this.rgbValues) {
          for (let i = 0; i < 3; i++) {
            this.rgbValues[key][i] += this.rgbSteps[key][i]
          }
        }
      }

      const tCol1 =
        'rgb(' +
        (this.rgbValues.start[0] | 0) +
        ',' +
        (this.rgbValues.start[1] | 0) +
        ',' +
        (this.rgbValues.start[2] | 0) +
        ')'
      const tCol2 =
        'rgb(' +
        (this.rgbValues.stop[0] | 0) +
        ',' +
        (this.rgbValues.stop[1] | 0) +
        ',' +
        (this.rgbValues.stop[2] | 0) +
        ')'

      if (tCol1 !== this.col1 || tCol2 !== this.col2) {
        this.col1 = tCol1
        this.col2 = tCol2
        this.currGradientStyle.backgroundImage =
          'linear-gradient(45deg, ' + this.col1 + ', ' + this.col2 + ')'
      }

      this.step++
      if (this.step > this.totalSteps) {
        this.step = 0

        this.currIdx = this.nextStep(this.currIdx)
        this.nextIdx = this.nextStep(this.nextIdx)

        this.calcSteps()
      }

      if (this.currGradientStyle.backgroundImage.includes('gradient') !== -1) {
        window.requestAnimationFrame(this.updateGradient)
      }
    },
  },
}
</script>
<style>
body {
  background-image: linear-gradient(45deg, rgb(53, 77, 116), rgb(84, 125, 157));
}
</style>
