<template>
  <div>
    <div class="flex flex-col h-screen w-screen">
      <div class="h-full basis-1/3 text-center mx-auto">
        <ButtonLaunch />
      </div>
      <div class="h-full basis-1/3"><Cover /></div>
      <div class="h-full basis-1/3">credits</div>
    </div>
    <ToneAbstract />
  </div>
</template>

<script>
export default {
  name: 'MainPage',
}
</script>
