<template>
  <div>
    <div class="flex flex-col h-screen w-9/12 mx-auto">
      <div class="h-full basis-1/4 text-center mx-auto">
        <div class="my-auto">
          <h1 class="my-6 text-white font-bold text-xl">
            L'INDECIS - WINDMILL IN MY HEAD
          </h1>
          <ButtonLaunch class="mx-auto my-6" />
        </div>
      </div>
      <div class="h-full basis-1/3"><Cover /></div>
      <div class="h-full basis-1/3">
        <div class="flex flex-row mx-auto w-80">
          <span class="w-12 my-auto text-slate">lowpass</span>
          <ProgressBar
            :progressValue="lowpassPropValue"
            class="my-4 mx-auto w-52 h-8"
          />
        </div>
        <div class="flex flex-row mx-auto w-80">
          <span class="w-12 my-auto text-slate-200">highpass</span>
          <ProgressBar
            :progressValue="highpassPropValue"
            class="my-4 mx-auto w-52 h-8"
          />
        </div>
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
