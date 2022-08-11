<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl m-auto">
      <div class="col-span-8 col-start-3">
        <div><img src="~/assets/windmill.png" /></div>
        <div class="grid grid-cols-3">
          <div class="col-span-1 h-60 mx-6">
            <ProgressBar :progressValue="100 - highpassPropValue" />
          </div>
          <div class="col-span-1 h-60 mx-6">
            <ProgressBar :progressValue="100 - lowpassPropValue" />
          </div>
          <div class="col-span-1 h-60 mx-6">
            <ProgressBar :progressValue="100 - highpassPropValue" />
          </div>
        </div>
        <div class="grid grid-cols-3 w-full mt-6">
          <font-awesome-icon
            class="col-span-1 h-60 mx-auto"
            icon="fa-solid fa-drum"
          />
          <font-awesome-icon
            class="col-span-1 h-60 mx-auto"
            icon="fa-solid fa-drum"
          />
          <font-awesome-icon
            class="col-span-1 h-60 mx-auto"
            icon="fa-solid fa-drum"
          />
        </div>
        <div class="grid grid-cols-3 mt-12 w-full gap-x-10 gap-y-10">
          <Pad
            v-for="item in [
              require('~/assets/drums.png'),
              require('~/assets/piano.png'),
              require('~/assets/bell.png'),
            ]"
            :key="item"
            :imgSrc="item"
            class="col-span-1 mx-auto content-center w-4/5"
          />
        </div>
      </div>
      <div class="col-span-1 mt-4">
        <img src="~/assets/question.png" />
      </div>
    </div>
  </div>
</template>

<script>
const MAINSONG = 'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/main.mp3'
export default {
  name: 'ToneAbstract',
  data() {
    return {
      tone: null,
      player: null,
      analyzer: null,
      highpass: null,
      lowpass: null,
    }
  },
  created() {
    this.$nuxt.$on('launch-synth', () => {
      if (this.tone === null) {
        this.firstStart()
      }
    })
  },
  methods: {
    async firstStart() {
      this.tone = await import('tone')
      this.highpass = new this.tone.Filter(this.highPassValue, 'highpass')
      this.lowpass = new this.tone.Filter(this.lowpassValue, 'lowpass')
      this.player = await new this.tone.Player(MAINSONG)
      this.player.connect(this.highpass)
      this.highpass.connect(this.lowpass)
      this.lowpass.connect(this.tone.Master)

      this.player.autostart = true
      this.player.loop = true
    },
  },
  computed: {
    highPassValue: {
      get() {
        return this.$store.state.highpassValue
      },
    },
    lowpassValue: {
      get() {
        return this.$store.state.lowpassValue
      },
    },
    highpassPropValue: {
      get() {
        return 100 * this.$store.state.highpassPropValue
      },
    },
    lowpassPropValue: {
      get() {
        return 100 * this.$store.state.lowpassPropValue
      },
    },
  },
  watch: {
    highPassValue(value) {
      if (this.highpass !== null) {
        this.highpass.set({ frequency: value })
      }
    },
    lowpassValue(value) {
      if (this.lowpass !== null) {
        this.lowpass.set({ frequency: value })
      }
    },
  },
}
</script>

<style scoped></style>
