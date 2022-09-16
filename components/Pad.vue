<template>
  <button
    @click="emitEvt()"
    class="text-lg m-auto text-lg hover:opacity-100 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
    :class="mutedClass"
  >
    <img :src="imgSrc" class="object-scale-down h-16 m-auto" />
  </button>
</template>

<script>
export default {
  name: 'PadMute',
  props: ['imgSrc', 'evtEmit'],
  data() {
    return {
      mutedClass: 'bg-transparent',
    }
  },
  methods: {
    emitEvt() {
      this.$nuxt.$emit(this.evtEmit)

      if (this.mutedClass === 'bg-transparent') {
        this.mutedClass = 'bg-gray-100'
      } else {
        this.mutedClass = 'bg-transparent'
      }
    },
  },
}
</script>

<style scoped></style>
