<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl m-auto">
      <div class="col-span-8 col-start-3">
        <div>
          <img src="~/assets/windmill.png" /> Clique ici avant de tester le
          reste, ce bouton sera remplacé par la page d'accueil<ButtonLaunch />
        </div>
        <div>
          Volume
          <vue-slider
            v-if="currentSelection == 'drums'"
            v-model="drumsVolumeValue"
            direction="btt"
            :min="-50"
            :max="0"
            :height="heightSlider"
            @dragging="(evt) => updateDrumsVolume(evt)"
          />
          <vue-slider
            v-else-if="currentSelection == 'piano'"
            v-model="pianoVolumeValue"
            direction="btt"
            :min="-50"
            :max="0"
            :height="heightSlider"
            @dragging="(evt) => updatePianoVolume(evt)"
          />
          <vue-slider
            v-else-if="currentSelection == 'bells'"
            v-model="bellsVolumeValue"
            direction="btt"
            :min="-50"
            :max="0"
            :height="heightSlider"
            @dragging="(evt) => updateBellsVolume(evt)"
          />
          <div v-else class="h-300">Select a pad</div>
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
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const BELLS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/1_bells_c.mp3'
const DRUMS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/3_drums_c.mp3'

const PIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/2_piano_c.mp3'
export default {
  name: 'ToneAbstract',
  components: {
    VueSlider,
  },
  data() {
    return {
      tone: null,
      player: null,
      currentSelection: null,
      heightSlider: 150,
      drums: null,
      drumsVolume: null,
      drumsVolumeValue: -50,
      piano: null,
      pianoVolume: null,
      pianoVolumeValue: -50,
      bells: null,
      bellsVolume: null,
      bellsVolumeValue: -50,
    }
  },
  created() {
    this.$nuxt.$on('launch-synth', () => {
      if (this.tone === null) {
        this.firstStart()
      }
    })

    this.$nuxt.$on('launch-drums', () => {
      this.currentSelection = 'drums'
    })
    this.$nuxt.$on('launch-piano', () => {
      this.currentSelection = 'piano'
    })
    this.$nuxt.$on('launch-bells', () => {
      this.currentSelection = 'bells'
    })
  },

  methods: {
    updateDrumsVolume() {
      this.drumsVolume.set({ volume: this.drumsVolumeValue })
    },
    updatePianoVolume() {
      this.pianoVolume.set({ volume: this.pianoVolumeValue })
    },
    updateBellsVolume() {
      this.bellsVolume.set({ volume: this.bellsVolumeValue })
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

      this.drums.connect(this.drumsVolume).sync()

      this.piano = await new this.tone.Player({
        url: PIANO,
        loop: true,
        autostart: true,
      })

      this.piano.connect(this.pianoVolume).sync()

      this.bells = await new this.tone.Player({
        url: BELLS,
        loop: true,
        autostart: true,
      })
      this.bells.connect(this.bellsVolume).sync()
      await this.tone.start()
      await this.tone.Transport.start()
    },
  },
}
</script>

<style scoped></style>
