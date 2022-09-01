<template>
  <div>
    <img id="bg-img" src="~/assets/cover.jpg" />

    <!--Modal-->
    <div class="h-screen w-screen flex flex-col" v-if="!started">
      <div class="m-auto">
        <img src="~/assets/windmill.png" />
        <button
          class="block m-auto bg-slate-200 text-slate-700 rounded-md shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-slate-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-400 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          @click="setStarted()"
        >
          <font-awesome-icon
            class="m-4 w-4 h-4"
            icon="fa-solid fa-headphones fa-xl"
          />
        </button>
      </div>
    </div>
    <ToneAbstract ref="abstract" v-show="started" />
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      started: false,
    }
  },
  methods: {
    setStarted() {
      this.started = true
      this.$refs.abstract.firstStart()
    },
  },
}
</script>
<style>
body {
  overflow: hidden;
  height: 100vh;
}
#bg-img {
  /* Add the blur effect */
  object-fit: cover;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
