<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl m-auto">
      <div class="col-span-8 col-start-3">
        <div>
          <img src="~/assets/windmill.png" />
        </div>

        <div :class="subContainerClass">
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/drums.png')"
              :evtEmit="'launch-drums'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="drumsVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateDrumsVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/piano.png')"
              :evtEmit="'launch-piano'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="pianoVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updatePianoVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/bell.png')"
              :evtEmit="'launch-bells'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="bellsVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateBellsVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/question.png')"
              :evtEmit="'launch-gtr'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="gtrVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateGtrVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/question.png')"
              :evtEmit="'launch-rhodes'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="rhodesVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateRhodesVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/question.png')"
              :evtEmit="'launch-strings'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="stringsVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateStringsVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/question.png')"
              :evtEmit="'launch-textures'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="texturesVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateTexturesVolume(evt)"
            />
          </div>
          <div :class="padClass">
            <Pad
              :imgSrc="require('~/assets/question.png')"
              :evtEmit="'launch-toypiano'"
              class="col-span-1 mx-auto content-center w-4/5"
            />
            <vue-slider
              v-model="toypianoVolumeValue"
              direction="btt"
              :min="-50"
              :max="0"
              :width="20"
              @dragging="(evt) => updateToypianoVolume(evt)"
            />
          </div>
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
import 'vue-slider-component/theme/default.css'

const BELLS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/1_bells_c.mp3'
const DRUMS =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/3_drums_c.mp3'
const PIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/2_piano_c.mp3'
const RHODES =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/5_rhodes_c.mp3'
const GUITAR =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/4_gtr_c.mp3'
const STRING =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/6_strings_c.mp3'
const TEXTURES =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/7_textures_c.mp3'
const TOYPIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/8_toypiano_c.mp3'
export default {
  name: 'ToneAbstract',
  components: {
    VueSlider,
  },
  data() {
    return {
      tone: null,
      player: null,
      currentSelection: 'drums',
      heightSlider: 150,
      drums: null,
      drumsVolume: null,
      drumsVolumeValue: -50,
      drumsBitcrusher: null,
      drumsBitcrusherWet: 0,
      drumsRevers: null,
      drumsReverbWet: 0,
      piano: null,
      pianoVolume: null,
      pianoVolumeValue: -50,
      pianoBitcrusher: null,
      pianoBitcrusherWet: 0,
      pianoReverb: null,
      pianoReverbWet: 0,
      bells: null,
      bellsVolume: null,
      bellsVolumeValue: -50,
      bellsBitcrusher: null,
      bellsBitcrusherWet: 0,
      bellsReverb: null,
      bellsReverbWet: 0,
      gtr: null,
      gtrVolume: null,
      gtrVolumeValue: -50,
      rhodes: null,
      rhodesVolume: null,
      rhodesVolumeValue: -50,
      strings: null,
      stringsVolume: null,
      stringsVolumeValue: -50,
      textures: null,
      texturesVolume: null,
      texturesVolumeValue: -50,
      toypiano: null,
      toypianoVolume: null,
      toypianoVolumeValue: -50,
      padClass: 'flex flex-row col-span-1 m-2',
      effectClass: 'flex flex-col col-span-1',
      effectTrackNameClass:
        'col-span-3 m-auto text-white font-bold bg-gray-600 p-2 rounded-lg',
      subContainerClass: 'grid grid-cols-4 mt-12 w-full',
      labelEffectClass: 'text-white p-1 m-4 text-center',
      sliderEffectClass: 'm-auto',
    }
  },
  beforeMount() {
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
    this.$nuxt.$on('launch-gtr', () => {
      this.currentSelection = 'gtr'
    })
    this.$nuxt.$on('launch-rhodes', () => {
      this.currentSelection = 'rhodes'
    })
    this.$nuxt.$on('launch-strings', () => {
      this.currentSelection = 'strings'
    })
    this.$nuxt.$on('launch-textures', () => {
      this.currentSelection = 'textures'
    })
    this.$nuxt.$on('launch-toypiano', () => {
      this.currentSelection = 'toypiano'
    })
  },

  methods: {
    // volume
    updateDrumsVolume() {
      this.drumsVolume.set({ volume: this.drumsVolumeValue })
      this.$nuxt.$emit('launch-drums')
    },
    updatePianoVolume() {
      this.pianoVolume.set({ volume: this.pianoVolumeValue })
      this.$nuxt.$emit('launch-piano')
    },
    updateBellsVolume() {
      this.bellsVolume.set({ volume: this.bellsVolumeValue })
      this.$nuxt.$emit('launch-bells')
    },
    updateGtrVolume() {
      this.gtrVolume.set({ volume: this.gtrVolumeValue })
      this.$nuxt.$emit('launch-gtr')
    },
    updateRhodesVolume() {
      this.rhodesVolume.set({ volume: this.rhodesVolumeValue })
      this.$nuxt.$emit('launch-rhodes')
    },
    updateStringsVolume() {
      this.stringsVolume.set({ volume: this.stringsVolumeValue })
      this.$nuxt.$emit('launch-strings')
    },
    updateTexturesVolume() {
      this.texturesVolume.set({ volume: this.texturesVolumeValue })
      this.$nuxt.$emit('launch-textures')
    },
    updateToypianoVolume() {
      this.toypianoVolume.set({ volume: this.toypianoVolumeValue })
      this.$nuxt.$emit('launch-toypiano')
    },
    // bitcrusher
    updateDrumsBitcrusherWet() {
      this.drumsBitcrusher.set({ wet: this.drumsBitcrusherWet })
    },
    updatePianoBitcrusherWet() {
      this.pianoBitcrusher.set({ wet: this.pianoBitcrusherWet })
    },
    updateBellsBitcrusherWet() {
      this.bellsBitcrusher.set({ wet: this.bellsBitcrusherWet })
    },
    // reverb
    updateDrumsReverbWet() {
      this.drumsReverb.set({ wet: this.drumsReverbWet })
    },
    updatePianoReverbWet() {
      this.pianoReverb.set({ wet: this.pianoReverbWet })
    },
    updateBellsReverbWet() {
      this.bellsReverb.set({ wet: this.bellsReverbWet })
    },
    async firstStart() {
      this.tone = await import('tone')
      const bitcrusherDefaultValue = 4
      const reverbDefaultValue = 20

      // volume

      this.drumsVolume = await new this.tone.Volume(this.drumsVolumeValue)
      this.pianoVolume = await new this.tone.Volume(this.pianoVolumeValue)
      this.bellsVolume = await new this.tone.Volume(this.bellsVolumeValue)
      this.gtrVolume = await new this.tone.Volume(this.gtrVolumeValue)
      this.rhodesVolume = await new this.tone.Volume(this.rhodesVolumeValue)
      this.stringsVolume = await new this.tone.Volume(this.stringsVolumeValue)
      this.texturesVolume = await new this.tone.Volume(this.texturesVolumeValue)
      this.toypianoVolume = await new this.tone.Volume(this.toypianoVolumeValue)

      // bitcrusher

      this.drumsBitcrusher = new this.tone.BitCrusher(bitcrusherDefaultValue)
      this.updateDrumsBitcrusherWet()
      this.pianoBitcrusher = new this.tone.BitCrusher(bitcrusherDefaultValue)
      this.updatePianoBitcrusherWet()
      this.bellsBitcrusher = new this.tone.BitCrusher(bitcrusherDefaultValue)
      this.updateBellsBitcrusherWet()

      // Reverb

      this.drumsReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updateDrumsReverbWet()
      this.pianoReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updatePianoReverbWet()
      this.bellsReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updateBellsReverbWet()

      this.drums = await new this.tone.Player({
        url: DRUMS,
        loop: true,
        autostart: true,
      }).sync()

      this.drums.connect(this.drumsBitcrusher)
      this.drumsBitcrusher.connect(this.drumsReverb)
      this.drumsReverb.connect(this.drumsVolume)
      this.drumsVolume.toDestination()

      this.piano = await new this.tone.Player({
        url: PIANO,
        loop: true,
        autostart: true,
      }).sync()

      this.piano.connect(this.pianoBitcrusher)
      this.pianoBitcrusher.connect(this.pianoReverb)
      this.pianoReverb.connect(this.pianoVolume)
      this.pianoVolume.toDestination()

      this.bells = await new this.tone.Player({
        url: BELLS,
        loop: true,
        autostart: true,
      }).sync()

      this.bells.connect(this.bellsBitcrusher)
      this.bellsBitcrusher.connect(this.bellsReverb)
      this.bellsReverb.connect(this.bellsVolume)
      this.bellsVolume.toDestination()

      this.gtr = await new this.tone.Player({
        url: GUITAR,
        loop: true,
        autostart: true,
      }).sync()

      this.gtr.connect(this.gtrVolume)
      this.gtrVolume.toDestination()

      this.rhodes = await new this.tone.Player({
        url: RHODES,
        loop: true,
        autostart: true,
      }).sync()

      this.rhodes.connect(this.rhodesVolume)
      this.rhodesVolume.toDestination()

      this.strings = await new this.tone.Player({
        url: STRING,
        loop: true,
        autostart: true,
      }).sync()

      this.strings.connect(this.stringsVolume)
      this.stringsVolume.toDestination()

      this.textures = await new this.tone.Player({
        url: TEXTURES,
        loop: true,
        autostart: true,
      }).sync()

      this.textures.connect(this.texturesVolume)
      this.texturesVolume.toDestination()

      this.toypiano = await new this.tone.Player({
        url: TOYPIANO,
        loop: true,
        autostart: true,
      }).sync()

      this.toypiano.connect(this.toypianoVolume)
      this.toypianoVolume.toDestination()

      await this.tone.start()
      await this.tone.Transport.start()
    },
  },
}
</script>

<style scoped></style>
