<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl lg:max-w-3xl m-auto">
      <div
        v-if="!toneLoaded"
        class="m-auto justify-center content-center text-center"
      >
        Loading audio experience...
      </div>
      <div v-if="toneLoaded" class="col-span-8 col-start-3">
        <div class="h-1/4">
          <img src="~/assets/windmill.png" />
        </div>

        <div :class="subContainerClass">
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-drums'"
              :imgSrc="require('~/assets/drums.png')"
              :imgSrcWhite="require('~/assets/drums-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-piano'"
              :imgSrc="require('~/assets/piano.png')"
              :imgSrcWhite="require('~/assets/piano-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-bells'"
              :imgSrc="require('~/assets/bell.png')"
              :imgSrcWhite="require('~/assets/bell-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-gtr'"
              :imgSrc="require('~/assets/guitar.png')"
              :imgSrcWhite="require('~/assets/guitar-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-rhodes'"
              :imgSrc="require('~/assets/rhodes.png')"
              :imgSrcWhite="require('~/assets/rhodes-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
          <div :class="padClass">
            <Pad
              :evtEmit="'launch-strings'"
              :imgSrc="require('~/assets/violin.png')"
              :imgSrcWhite="require('~/assets/violin-white.png')"
              class="col-span-1 mx-auto content-center w-4/5"
            />
          </div>
        </div>

        <div v-if="currentSelection == 'bells'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="bellsVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updateBellsVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>
          <div :class="effectClass">
            <vue-slider
              v-model="bellsReverbWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateBellsReverbWet(evt)"
            />
            <div :class="labelEffectClass">Reverb</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="bellsBitcrusherWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateBellsBitcrusherWet(evt)"
            />
            <div :class="labelEffectClass">Bitcrusher</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="bellsVibratoWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateBellsVibratoWet(evt)"
            />
            <div :class="labelEffectClass">Vibrato</div>
          </div>
        </div>

        <div v-if="currentSelection == 'piano'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="pianoVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updatePianoVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="propPianoToypiano"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updatePianoVolume(evt)"
            />
            <div :class="labelEffectClass">Piano/Toypiano</div>
          </div>
          <div :class="effectClass">
            <vue-slider
              v-model="pianoPhaserWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updatePianoPhaserWet(evt)"
            />
            <div :class="labelEffectClass">Phaser</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="pianoVibratoWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updatePianoVibratoWet(evt)"
            />
            <div :class="labelEffectClass">Vibrato</div>
          </div>
        </div>

        <div v-if="currentSelection == 'gtr'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="gtrVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updateGtrVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="gtrDelayWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateGtrDelayWet(evt)"
            />
            <div :class="labelEffectClass">Delay</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="gtrReverbWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateGtrReverbWet(evt)"
            />
            <div :class="labelEffectClass">Reverb</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="gtrVibratoWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateGtrVibratoWet(evt)"
            />
            <div :class="labelEffectClass">Vibrato</div>
          </div>
        </div>

        <div v-if="currentSelection == 'rhodes'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="rhodesVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updateRhodesVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="rhodesPingPongDelayWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateRhodesPingPongDelayWet(evt)"
            />
            <div :class="labelEffectClass">Delay</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="rhodesFilterWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateRhodesFilterWet(evt)"
            />
            <div :class="labelEffectClass">Filter</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="rhodesVibratoWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateRhodesVibratoWet(evt)"
            />
            <div :class="labelEffectClass">Vibrato</div>
          </div>
        </div>

        <div v-if="currentSelection == 'strings'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="stringsVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updateStringsVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="stringsReverbWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateStringsReverbWet(evt)"
            />
            <div :class="labelEffectClass">Reverb</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="stringsBitcrusherWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateStringsBitcrusherWet(evt)"
            />
            <div :class="labelEffectClass">Bitcrusher</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="stringsVibratoWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateStringsVibratoWet(evt)"
            />
            <div :class="labelEffectClass">Vibrato</div>
          </div>
        </div>

        <div v-if="currentSelection == 'drums'" :class="effectContainerClass">
          <div :class="effectClass">
            <vue-slider
              v-model="drumsVolumeValue"
              :class="sliderEffectClass"
              :max="0"
              :min="-28"
              :width="20"
              :height="50"
              direction="btt"
              @dragging="(evt) => updateDrumsVolume(evt)"
            />
            <div :class="labelEffectClass">Volume</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="drumsFrequencyShifterWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateDrumsFrequencyShifterWet(evt)"
            />
            <div :class="labelEffectClass">Frequency</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="drumsAutofilterWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateDrumsAutofilterWet(evt)"
            />
            <div :class="labelEffectClass">Autofilter</div>
          </div>

          <div :class="effectClass">
            <vue-slider
              v-model="drumsAutowahWet"
              :class="sliderEffectClass"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateDrumsAutowahWet(evt)"
            />
            <div :class="labelEffectClass">Autowah</div>
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

const BELLS = 'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/2_bells.aac'
const DRUMS = 'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/8_drums.aac'
const PIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/4_doublepiano.aac'
const RHODES =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/6_rhodes.aac'
const GUITAR = 'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/5_gtr.aac'
const STRING =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/7_strings.aac'
const TEXTURES =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/1_textures.aac'
const TOYPIANO =
  'https://lindecis-windmill.s3.eu-west-3.amazonaws.com/3_toypiano.aac'
export default {
  name: 'ToneAbstract',
  components: {
    VueSlider,
  },
  data() {
    return {
      tone: null,
      toneLoaded: false,
      player: null,
      currentSelection: 'drums',
      heightSlider: 150,
      drums: null,
      drumsVolume: null,
      drumsVolumeValue: -28,
      drumsFrequencyShifter: null,
      drumsFrequencyShifterWet: 0,
      drumsAutofilter: null,
      drumsAutofilterWet: 0,
      drumsAutowah: null,
      drumsAutowahWet: 0,
      piano: null,
      pianoVolume: null,
      pianoVolumeValue: -28,
      pianoPhaser: null,
      pianoPhaserWet: 0,
      pianoVibrato: null,
      pianoVibratoWet: 0,
      bells: null,
      bellsVolume: null,
      bellsVolumeValue: -28,
      bellsReverb: null,
      bellsReverbWet: 0,
      bellsBitcrusher: null,
      bellsBitcrusherWet: 0,
      bellsVibrato: null,
      bellsVibratoWet: 0,
      gtr: null,
      gtrVolume: null,
      gtrVolumeValue: -28,
      gtrDelay: null,
      gtrDelayWet: 0,
      gtrReverb: null,
      gtrReverbWet: 0,
      gtrVibrato: null,
      gtrVibratoWet: 0,
      rhodes: null,
      rhodesVolume: null,
      rhodesVolumeValue: -28,
      rhodesPingPongDelay: null,
      rhodesPingPongDelayWet: 0,
      rhodesFilter: null,
      rhodesFilterWet: 0,
      rhodesVibrato: null,
      rhodesVibratoWet: 0,
      strings: null,
      stringsVolume: null,
      stringsVolumeValue: -28,
      stringsReverb: null,
      stringsReverbWet: 0,
      stringsBitcrusher: null,
      stringsBitcrusherWet: 0,
      stringsVibrato: null,
      stringsVibratoWet: 0,
      textures: null,
      texturesVolume: null,
      texturesVolumeValue: -5,
      toypiano: null,
      toypianoVolume: null,
      toypianoVolumeValue: -28,
      toypianoPhaser: null,
      toypianoVibrato: null,
      propPianoToypiano: 0.5,
      padClass: 'flex flex-row col-span-1 m-2 lg:m-6',
      effectClass: 'flex flex-col col-span-1',
      effectTrackNameClass:
        'col-span-3 m-auto text-white font-bold bg-gray-600 p-2 rounded-lg',
      subContainerClass: 'grid grid-cols-3 h-1/2 w-full',
      effectContainerClass: 'grid grid-cols-4 w-full h-1/4',
      labelEffectClass: 'text-white text-sm p-1 m-4 text-center',
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
      this.drumsVolumeValue = this.volumeActivation(this.drumsVolumeValue)
      this.updateDrumsVolume()
    })
    this.$nuxt.$on('launch-piano', () => {
      this.currentSelection = 'piano'
      this.pianoVolumeValue = this.volumeActivation(this.pianoVolumeValue)
      this.updatePianoVolume()
    })
    this.$nuxt.$on('launch-bells', () => {
      this.currentSelection = 'bells'
      this.bellsVolumeValue = this.volumeActivation(this.bellsVolumeValue)
      this.updateBellsVolume()
    })
    this.$nuxt.$on('launch-gtr', () => {
      this.currentSelection = 'gtr'
      this.gtrVolumeValue = this.volumeActivation(this.gtrVolumeValue)
      this.updateGtrVolume()
    })
    this.$nuxt.$on('launch-rhodes', () => {
      this.currentSelection = 'rhodes'
      this.rhodesVolumeValue = this.volumeActivation(this.rhodesVolumeValue)
      this.updateRhodesVolume()
    })
    this.$nuxt.$on('launch-strings', () => {
      this.currentSelection = 'strings'
      this.stringsVolumeValue = this.volumeActivation(this.stringsVolumeValue)
      this.updateStringsVolume()
    })
    this.$nuxt.$on('launch-textures', () => {
      this.currentSelection = 'textures'
    })
    this.$nuxt.$on('launch-toypiano', () => {
      this.currentSelection = 'toypiano'
      this.toypianoVolumeValue = this.volumeActivation(this.toypianoVolumeValue)
      this.updatePianoVolume()
    })
  },

  methods: {
    // volume
    volumeSetter(vol) {
      if (vol === -28) {
        return -Infinity
      }
      return vol
    },
    volumeActivation(vol) {
      if (vol === -28) {
        return 0
      }
      return -28
    },
    updateDrumsVolume() {
      this.drumsVolume.set({ volume: this.volumeSetter(this.drumsVolumeValue) })
    },
    updatePianoVolume() {
      this.pianoVolume.set({
        volume: this.volumeSetter(
          this.propPianoToypiano * this.pianoVolumeValue
        ),
      })
      this.toypianoVolume.set({
        volume: this.volumeSetter(
          (1 - this.propPianoToypiano) * this.pianoVolumeValue
        ),
      })
    },
    updateBellsVolume() {
      this.bellsVolume.set({ volume: this.volumeSetter(this.bellsVolumeValue) })
    },
    updateGtrVolume() {
      this.gtrVolume.set({ volume: this.volumeSetter(this.gtrVolumeValue) })
    },
    updateRhodesVolume() {
      this.rhodesVolume.set({
        volume: this.volumeSetter(this.rhodesVolumeValue),
      })
    },
    updateStringsVolume() {
      this.stringsVolume.set({
        volume: this.volumeSetter(this.stringsVolumeValue),
      })
    },
    // bells
    updateBellsReverbWet() {
      this.bellsReverb.set({ wet: this.bellsReverbWet })
    },
    updateBellsBitcrusherWet() {
      this.bellsBitcrusher.set({ wet: this.bellsBitcrusherWet })
    },
    updateBellsVibratoWet() {
      this.bellsVibrato.set({ wet: this.bellsVibratoWet })
    },
    // piano
    updatePianoPhaserWet() {
      this.pianoPhaser.set({ wet: this.pianoPhaserWet })
      this.toypianoPhaser.set({ wet: this.pianoPhaserWet })
    },
    updatePianoVibratoWet() {
      this.pianoVibrato.set({ wet: this.pianoVibratoWet })
      this.toypianoVibrato.set({ wet: this.pianoVibratoWet })
    },
    // gtr
    updateGtrDelayWet() {
      this.gtrDelay.set({ wet: this.gtrVibratoWet })
    },
    updateGtrReverbWet() {
      this.gtrReverb.set({ wet: this.gtrReverbWet })
    },
    updateGtrVibratoWet() {
      this.gtrVibrato.set({ wet: this.gtrVibratoWet })
    },
    // rhodes

    updateRhodesPingPongDelayWet() {
      this.rhodesPingPongDelay.set({ wet: this.rhodesPingPongDelayWet })
    },
    updateRhodesFilterWet() {
      this.rhodesFilter.set({ wet: this.rhodesFilterWet })
    },
    updateRhodesVibratoWet() {
      this.rhodesVibrato.set({ wet: this.rhodesVibratoWet })
    },

    // strings

    updateStringsReverbWet() {
      this.stringsReverb.set({ wet: this.stringsReverbWet })
    },
    updateStringsBitcrusherWet() {
      this.stringsBitcrusher.set({ wet: this.stringsBitcrusherWet })
    },
    updateStringsVibratoWet() {
      this.stringsVibrato.set({ wet: this.stringsVibratoWet })
    },

    // drums

    updateDrumsFrequencyShifterWet() {
      this.drumsFrequencyShifter.set({ wet: this.drumsFrequencyShifterWet })
    },
    updateDrumsAutofilterWet() {
      this.drumsAutofilter.set({ wet: this.drumsAutofilterWet })
    },
    updateDrumsAutowahWet() {
      this.drumsAutowah.set({ wet: this.drumsAutowahWet })
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

      // bells

      this.bellsBitcrusher = new this.tone.BitCrusher(bitcrusherDefaultValue)
      this.updateBellsBitcrusherWet()
      this.bellsReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updateBellsReverbWet()
      this.bellsVibrato = new this.tone.Vibrato()
      this.updateBellsVibratoWet()

      // piano

      this.pianoVibrato = new this.tone.Vibrato()
      this.toypianoVibrato = new this.tone.Vibrato()
      this.updatePianoVibratoWet()
      this.pianoPhaser = new this.tone.Phaser()
      this.toypianoPhaser = new this.tone.Vibrato()
      this.updatePianoPhaserWet()

      // gtr

      this.gtrDelay = new this.tone.Delay(0.1)
      this.updateGtrDelayWet()
      this.gtrReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updateGtrReverbWet()
      this.gtrVibrato = new this.tone.Vibrato()
      this.updateGtrVibratoWet()

      // rhodes

      this.rhodesPingPongDelay = new this.tone.PingPongDelay('4n', 0.2)
      this.updateRhodesPingPongDelayWet()
      this.rhodesFilter = new this.tone.AutoFilter('4n')
      this.updateRhodesFilterWet()
      this.rhodesVibrato = new this.tone.Vibrato()
      this.updateRhodesVibratoWet()

      // strings

      this.stringsReverb = new this.tone.Reverb(reverbDefaultValue)
      this.updateStringsReverbWet()
      this.stringsBitcrusher = new this.tone.BitCrusher(bitcrusherDefaultValue)
      this.updateStringsBitcrusherWet()
      this.stringsVibrato = new this.tone.Vibrato()
      this.updateStringsVibratoWet()

      // drums

      this.drumsFrequencyShifter = new this.tone.FrequencyShifter(45)
      this.updateDrumsFrequencyShifterWet()
      this.drumsAutofilter = new this.tone.AutoFilter('4n')
      this.updateDrumsAutofilterWet()
      this.drumsAutowah = new this.tone.AutoWah(50, 6, -30)
      this.updateDrumsAutowahWet()

      this.drums = await new this.tone.Player({
        url: DRUMS,
      }).sync()

      this.drums.connect(this.drumsFrequencyShifter)
      this.drumsFrequencyShifter.connect(this.drumsAutofilter)
      this.drumsAutofilter.connect(this.drumsAutowah)
      this.drumsAutowah.connect(this.drumsVolume)
      this.drumsVolume.toDestination()

      this.piano = await new this.tone.Player({
        url: PIANO,
      }).sync()

      this.piano.connect(this.pianoPhaser)
      this.pianoPhaser.connect(this.pianoVibrato)
      this.pianoVibrato.connect(this.pianoVolume)
      this.pianoVolume.toDestination()

      this.bells = await new this.tone.Player({
        url: BELLS,
      }).sync()

      this.bells.connect(this.bellsBitcrusher)
      this.bellsBitcrusher.connect(this.bellsVibrato)
      this.bellsVibrato.connect(this.bellsReverb)
      this.bellsReverb.connect(this.bellsVolume)
      this.bellsVolume.toDestination()

      this.gtr = await new this.tone.Player({
        url: GUITAR,
      }).sync()

      this.gtr.connect(this.gtrDelay)
      this.gtrDelay.connect(this.gtrReverb)
      this.gtrReverb.connect(this.gtrVibrato)
      this.gtrVibrato.connect(this.gtrVolume)
      this.gtrVolume.toDestination()

      this.rhodes = await new this.tone.Player({
        url: RHODES,
      }).sync()

      this.rhodes.connect(this.rhodesPingPongDelay)
      this.rhodesPingPongDelay.connect(this.rhodesFilter)
      this.rhodesFilter.connect(this.rhodesVibrato)
      this.rhodesVibrato.connect(this.rhodesVolume)
      this.rhodesVolume.toDestination()

      this.strings = await new this.tone.Player({
        url: STRING,
      }).sync()

      this.strings.connect(this.stringsReverb)
      this.stringsReverb.connect(this.stringsBitcrusher)
      this.stringsBitcrusher.connect(this.stringsVibrato)
      this.stringsVibrato.connect(this.stringsVolume)
      this.stringsVolume.toDestination()

      this.textures = await new this.tone.Player({
        url: TEXTURES,
      }).sync()

      this.textures.connect(this.texturesVolume)
      this.texturesVolume.toDestination()

      this.toypiano = await new this.tone.Player({
        url: TOYPIANO,
      }).sync()

      this.toypiano.connect(this.toypianoPhaser)
      this.toypianoPhaser.connect(this.toypianoVibrato)
      this.toypianoVibrato.connect(this.toypianoVolume)
      this.toypianoVolume.toDestination()

      this.tone.loaded().then(() => {
        this.tone.Transport.bpm.value = 94
        this.tone.Transport.loopStart = '0m'
        this.tone.Transport.loopEnd = '8m'
        this.tone.Transport.loop = true

        this.bells.start(0)
        this.drums.start(0)
        this.piano.start(0)
        this.toypiano.start(0)
        this.textures.start(0)
        this.strings.start(0)
        this.gtr.start(0)
        this.rhodes.start(0)

        this.tone.Transport.start()
        this.tone.start()
        this.toneLoaded = true
        console.log('ToneJS loaded')
      })
    },
  },
}
</script>

<style scoped></style>
