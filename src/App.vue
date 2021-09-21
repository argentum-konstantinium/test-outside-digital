<template>
  <div id="app">
    <Popup/>
  </div>
</template>

<script>
import Popup from "@/components/Popup"
export default {
  name: 'App',
  components: {
    Popup
  }
}
</script>

<style lang="scss">
@import "@/assets/style/reset.scss";
@import "@/assets/style/main.scss";
</style>
