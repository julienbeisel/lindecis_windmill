<template>
  <button
    class="text-lg m-auto text-lg bg-gray-200 opacity-90 hover:opacity-100 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
  >
    <img :src="imgSrc" class="object-fit w-full h-full" />
  </button>
</template>

<script>
export default {
  name: 'PadMute',
  props: ['imgSrc'],
}
</script>

<style scoped></style>
