<template>
  <button
    @click="emitEvt()"
    class="text-lg m-auto text-lg hover:opacity-100 hover:bg-gray-20 rounded-md transition duration-150 ease-in-out"
  >
    <img
      v-if="!activated"
      :src="imgSrc"
      class="object-scale-down h-16 m-auto"
    />
    <img v-else :src="imgSrcWhite" class="object-scale-down h-16 m-auto" />
  </button>
</template>

<script>
export default {
  name: 'PadMute',
  props: ['imgSrc', 'imgSrcWhite', 'evtEmit'],
  data() {
    return {
      activated: false,
    }
  },
  methods: {
    emitEvt() {
      this.$nuxt.$emit(this.evtEmit)
      this.activated = !this.activated
    },
  },
}
</script>

<style scoped></style>
