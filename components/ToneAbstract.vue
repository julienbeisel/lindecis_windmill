<template><div></div></template>

<script>
var toneModule
var player

export default {
  name: 'ToneAbstract',
  created() {
    this.$nuxt.$on('launch-synth', () => {
      const ready = this.$store.state.isToneLoaded
      if (!ready) {
        this.firstStart()
        console.log(player.state)
      } else if (ready && player.state === 'stopped') {
        player.stop()
      }
    })
  },
  methods: {
    async firstStart(storeContext) {
      toneModule = await import('tone')
      player = new toneModule.Player(
        'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/main.mp3'
      ).toDestination()
      player.autostart = true
    },
  },
}
</script>

<style scoped></style>
