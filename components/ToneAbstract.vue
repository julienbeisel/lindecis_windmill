<template>
  <div>
    <div class="grid grid-cols-12 h-screen max-w-xl m-auto">
      <div class="col-span-8 col-start-3">
        <div>
          <img src="~/assets/windmill.png" />
        </div>

        <div v-if="currentSelection == 'drums'" :class="subContainerClass">
          <div class="col-span-3 m-auto text-white">
            {{ currentSelection }} effects
          </div>

          <div :class="effectClass">
            <div :class="labelEffectClass">Bitcrusher</div>
            <vue-slider
              v-model="drumsBitcrusherWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateDrumsBitcrusherWet(evt)"
            />
          </div>

          <div :class="effectClass">
            <div :class="labelEffectClass">Reverb</div>
            <vue-slider
              v-model="drumsReverbWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateDrumsReverbWet(evt)"
            />
          </div>
        </div>

        <div v-if="currentSelection == 'piano'" :class="subContainerClass">
          <div class="col-span-3 m-auto text-white">
            {{ currentSelection }} effects
          </div>
          <div :class="effectClass">
            <div :class="labelEffectClass">Bitcrusher</div>
            <vue-slider
              v-model="pianoBitcrusherWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updatePianoBitcrusherWet(evt)"
            />
          </div>

          <div :class="effectClass">
            <div :class="labelEffectClass">Reverb</div>
            <vue-slider
              v-model="pianoReverbWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updatePianoReverbWet(evt)"
            />
          </div>
        </div>

        <div v-if="currentSelection == 'bells'" :class="subContainerClass">
          <div class="col-span-3 m-auto text-white">
            {{ currentSelection }} effects
          </div>
          <div :class="effectClass">
            <div :class="labelEffectClass">Bitcrusher</div>
            <vue-slider
              v-model="bellsBitcrusherWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateBellsBitcrusherWet(evt)"
            />
          </div>
          <div :class="effectClass">
            <div :class="labelEffectClass">Reverb</div>
            <vue-slider
              v-model="bellsReverbWet"
              direction="btt"
              :min="0"
              :max="1"
              :interval="0.1"
              :width="20"
              :height="50"
              @dragging="(evt) => updateBellsReverbWet(evt)"
            />
          </div>
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
      padClass: 'flex flex-row col-span-1',
      effectClass: 'flex flex-col col-span-1',
      subContainerClass: 'grid grid-cols-3 mt-12 w-full',
      labelEffectClass: 'text-white',
    }
  },
  beforeMount() {
    console.log('ok')
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
      })

      this.drums.connect(this.drumsBitcrusher)
      this.drumsBitcrusher.connect(this.drumsReverb)
      this.drumsReverb.connect(this.drumsVolume)
      this.drumsVolume.toDestination()

      this.piano = await new this.tone.Player({
        url: PIANO,
        loop: true,
        autostart: true,
      })

      this.piano.connect(this.pianoBitcrusher)
      this.pianoBitcrusher.connect(this.pianoReverb)
      this.pianoReverb.connect(this.pianoVolume)
      this.pianoVolume.toDestination()

      this.bells = await new this.tone.Player({
        url: BELLS,
        loop: true,
        autostart: true,
      })
      this.bells.connect(this.bellsBitcrusher)
      this.bellsBitcrusher.connect(this.bellsReverb)
      this.bellsReverb.connect(this.bellsVolume)
      this.bellsVolume.toDestination()

      await this.tone.start()
      await this.tone.Transport.start()
    },
  },
}
</script>

<style scoped></style>
