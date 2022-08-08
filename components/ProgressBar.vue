<template>
  <div class="relative bg-gray-600 rounded-lg overflow-hidden z-10 opacity-50">
    <div
      :style="{ width: progressValue + '%' }"
      class="absolute inset-0 z-15 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
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
      default: '',
      type: String,
    },
  },
}
</script>
