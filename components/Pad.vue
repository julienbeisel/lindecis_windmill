<template>
  <button
    @click="emitEvt()"
    class="text-lg m-auto text-lg bg-gray-200 opacity-90 hover:opacity-100 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
  >
    <img :src="imgSrc" class="object-fit w-full h-full" />
    <font-awesome-icon
      class="col-span-1 h-60 mx-auto"
      :icon="this.isPlaying()"
    />
  </button>
</template>

<script>
export default {
  name: 'PadMute',
  props: ['imgSrc', 'evtEmit', 'isMuted'],
  data() {
    return {
      mutedClass: 'opacity-10',
    }
  },
  methods: {
    emitEvt() {
      this.$nuxt.$emit(this.evtEmit)
    },
    isPlaying() {
      if (this.isMuted) {
        return 'fa-solid fa-play'
      } else {
        return 'fa-solid fa-pause'
      }
    },
  },
}
</script>

<style scoped></style>
