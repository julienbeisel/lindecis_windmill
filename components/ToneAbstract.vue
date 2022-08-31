<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl m-auto">
      <div class="col-span-8 col-start-3">
        <div>
          <img src="~/assets/windmill.png" /> Clique ici avant de tester le
          reste, ce bouton sera remplacé par la page d'accueil<ButtonLaunch />
        </div>

        <div class="grid grid-cols-3 mt-12 w-full gap-x-10 gap-y-10">
          <Pad
            v-for="item in [
              [
                require('~/assets/drums.png'),
                'launch-drums',
                this.drumsVolumeValue === -Infinity,
              ],
              [
                require('~/assets/piano.png'),
                'launch-piano',
                this.pianoVolumeValue === -Infinity,
              ],
              [
                require('~/assets/bell.png'),
                'launch-bells',
                this.bellsVolumeValue === -Infinity,
              ],
            ]"
            :key="item[0]"
            :imgSrc="item[0]"
            :evtEmit="item[1]"
            :isMuted="item[2]"
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
const BELLS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/1_bells_c.mp3'
const DRUMS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/3_drums_c.mp3'

const PIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/2_piano_c.mp3'
export default {
  name: 'ToneAbstract',
  data() {
    return {
      tone: null,
      player: null,
      drums: null,
      drumsVolume: null,
      drumsVolumeValue: -Infinity,
      piano: null,
      pianoVolume: null,
      pianoVolumeValue: -Infinity,
      bells: null,
      bellsVolume: null,
      bellsVolumeValue: -Infinity,
    }
  },
  created() {
    this.$nuxt.$on('launch-synth', () => {
      if (this.tone === null) {
        this.firstStart()
      }
    })

    this.$nuxt.$on('launch-drums', () => {
      this.drumsVolumeValue = this.switchVolume(this.drumsVolumeValue)
      this.drumsVolume.set({ volume: this.drumsVolumeValue })
    })

    this.$nuxt.$on('launch-bells', () => {
      this.bellsVolumeValue = this.switchVolume(this.bellsVolumeValue)
      this.bellsVolume.set({ volume: this.bellsVolumeValue })
    })

    this.$nuxt.$on('launch-piano', () => {
      this.pianoVolumeValue = this.switchVolume(this.pianoVolumeValue)
      this.pianoVolume.set({ volume: this.pianoVolumeValue })
    })
  },

  methods: {
    switchVolume(volume) {
      if (volume === 0) {
        return -Infinity
      }
      return 0
    },
    async firstStart() {
      this.tone = await import('tone')

      this.drumsVolume = await new this.tone.Volume(
        this.drumsVolumeValue
      ).toDestination()
      this.pianoVolume = await new this.tone.Volume(
        this.pianoVolumeValue
      ).toDestination()
      this.bellsVolume = await new this.tone.Volume(
        this.bellsVolumeValue
      ).toDestination()

      this.drums = await new this.tone.Player({
        url: DRUMS,
        loop: true,
        autostart: true,
      })
        .connect(this.drumsVolume)
        .sync()
        .start(0)

      this.drums.volume = -Infinity
      this.piano = await new this.tone.Player({
        url: PIANO,
        loop: true,
        autostart: true,
      })
        .connect(this.pianoVolume)
        .sync()
        .start(0)
      this.bells = await new this.tone.Player({
        url: BELLS,
        loop: true,
        autostart: true,
      })
        .connect(this.bellsVolume)
        .sync()
        .start(0)

      this.tone.Transport.start()
    },
  },
}
</script>

<style scoped></style>
