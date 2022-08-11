<template>
  <div
    class="relative w-full h-full bg-gray-500 rounded-md overflow-hidden z-10 opacity-100"
  >
    <div
      :style="{ height: progressValue + '%' }"
      class="absolute inset-0 z-15 shadow-none whitespace-nowrap text-white justify-center bg-gray-200"
    >
      {{ progressText }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    progressValue: {
      default: 0,
      type: Number,
    },
    progressText: {
      default: ' ',
      type: String,
    },
  },
}
</script>
