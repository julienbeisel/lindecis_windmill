<template>
  <div>
    <div class="flex flex-col h-screen w-screen">
      <div class="h-full basis-1/3 text-center mx-auto">
        <ButtonLaunch />
      </div>
      <div class="h-full basis-1/3"><Cover /></div>
      <div id="p5Canvas" class="h-full basis-1/3"><WaveformP5 /></div>
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
      this.player = await new this.tone.Player(MAINSONG).toDestination()
      this.player.autostart = true
      this.player.loop = true
    },
  },
}
</script>

<style scoped></style>
