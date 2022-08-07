<template>
  <button
    class="block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
    type="button"
    @click="launchPlayer()"
  >
    Experience it
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
