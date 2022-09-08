<template>
  <button
    @click="emitEvt()"
    class="text-lg m-auto text-lg opacity-90 hover:opacity-100 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
  >
    <img :src="imgSrc" class="object-scale-down h-16" />
  </button>
</template>

<script>
export default {
  name: 'PadMute',
  props: ['imgSrc', 'evtEmit'],
  data() {
    return {
      mutedClass: 'opacity-10',
    }
  },
  methods: {
    emitEvt() {
      this.$nuxt.$emit(this.evtEmit)
    },
  },
}
</script>

<style scoped></style>
