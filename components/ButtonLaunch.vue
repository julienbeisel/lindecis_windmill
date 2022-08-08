<template>
  <button
    class="block bg-slate-200 text-slate-700 rounded-md shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-slate-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-400 active:shadow-lg transition duration-150 ease-in-out"
    type="button"
    @click="launchPlayer()"
  >
    <font-awesome-icon class="m-2 w-4 h-4" icon="fa-solid fa-headphones" />
  </button>
</template>

<script>
export default {
  name: 'ButtonLaunch',
  methods: {
    launchPlayer() {
      this.$nuxt.$emit('launch-synth')
    },
  },
}
</script>

<style scoped></style>
