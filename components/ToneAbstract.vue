<template>
  <div>
    <div class="flex flex-col h-screen w-screen">
      <div class="h-full basis-1/3 text-center mx-auto">
        <ButtonLaunch />
      </div>
      <div class="h-full basis-1/3"><Cover /></div>
      <div class="h-full basis-1/3">credits</div>
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
      this.player = new this.tone.Player().toDestination()
      this.player.autostart = true
      this.player.loop = true
      this.player.loopStart = 1.0
      await this.player.load(MAINSONG)
      this.analyzer = new this.tone.Analyser('waveform', 128)
      this.player.connect(this.analyzer)
    },
  },
}
</script>

<style scoped></style>
