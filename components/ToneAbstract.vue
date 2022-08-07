<template>
  <div>
    <div class="flex flex-col h-screen w-screen">
      <div class="h-full basis-1/3 text-center mx-auto">
        <div class="my-auto h-20">
          <h1 class="my-6 text-white font-bold text-xl">
            L'INDECIS - WINDMILL IN MY HEAD
          </h1>
          <ButtonLaunch class="mx-auto my-6" />
        </div>
      </div>
      <div class="h-full basis-1/3"><Cover /></div>
      <div class="h-full basis-1/3">
        WIP: highpass value {{ $store.state.highpassValue }}
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
      this.player = await new this.tone.Player(MAINSONG)
      this.player.connect(this.highpass)
      this.highpass.connect(this.tone.Master)

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
  },
  watch: {
    highPassValue(value) {
      if (this.highpass !== null) {
        this.highpass.set({ frequency: value })
      }
    },
  },
}
</script>

<style scoped></style>
