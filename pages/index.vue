<template>
  <div>
    <img id="bg-img" src="~/assets/cover.jpg" />
    <ToneAbstract />
  </div>
</template>

<script>
export default {
  name: 'MainPage',
}
</script>
<style>
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
