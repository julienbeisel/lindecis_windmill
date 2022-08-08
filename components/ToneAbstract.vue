<template>
  <div>
    <div class="flex flex-col h-screen mx-auto w-96">
      <div class="my-12 text-left mx-auto">
        <div class="my-auto">
          <h1 class="my-6 text-slate-200 font-bold text-3xl">
            WINDMILL IN MY HEAD
          </h1>
          <div class="flex flex-row">
            <h1 class="my-auto text-slate-200 font-bold text-xl">L'INDECIS</h1>
            <ButtonLaunch class="mx-6 my-auto" />
          </div>
        </div>
      </div>
      <div class=""><Cover /></div>
      <div class="my-6">
        <div class="flex flex-row mx-auto w-80">
          <span class="w-12 my-auto text-slate-600 text-xs">lowpass</span>
          <ProgressBar
            :progressValue="lowpassPropValue"
            class="my-2 mx-auto w-52 h-4"
          />
        </div>
        <div class="flex flex-row mx-auto w-80">
          <span class="w-12 my-auto text-slate-600 text-xs">highpass</span>
          <ProgressBar
            :progressValue="highpassPropValue"
            class="my-2 mx-auto w-52 h-4"
          />
        </div>

        <div class="grid grid-cols-3 mt-32 mx-auto w-96">
          <div class="col-span-1 mx-auto text-slate-200 font-bold text-xl">
            STREAM
          </div>
          <div class="col-span-1 mx-auto text-slate-200 font-bold text-xl">
            VINYLS
          </div>
          <div class="col-span-1 mx-auto text-slate-200 font-bold text-xl">
            SOCIALS
          </div>
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
