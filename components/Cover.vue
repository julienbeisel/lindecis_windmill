<!-- Please remove this file from your project -->
<template>
  <div>
    <img
      id="elementId"
      @mousemove="moving"
      @touchmove="moving"
      class="w-80 my-auto mx-auto opacity-80"
      src="~/assets/cover.jpg"
    />
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  mounted() {},
  methods: {
    moving(e) {
      let x
      let y
      const rect = document.getElementById('elementId').getBoundingClientRect()
      if (e.type === 'touchmove') {
        e.preventDefault()
        const touch = e.touches[0] || e.changedTouches[0]
        x = touch.pageX
        y = touch.pageY
      } else if (
        e.type === 'mousedown' ||
        e.type === 'mouseup' ||
        e.type === 'mousemove' ||
        e.type === 'mouseover' ||
        e.type === 'mouseout' ||
        e.type === 'mouseenter' ||
        e.type === 'mouseleave'
      ) {
        x = e.clientX
        y = e.clientY
      }

      x = Math.min(Math.abs((rect.left - x) / (rect.right - rect.left)), 1)
      y = Math.abs((rect.top - y) / (rect.top - rect.bottom))
      console.log(y)

      this.$store.commit('setHighpassValue', x)
      this.$store.commit('setLowpassValue', y)
    },
  },
}
</script>
