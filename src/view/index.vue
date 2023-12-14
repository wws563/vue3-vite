<script setup lang="ts">
// let a = 'test'
</script>

<template>
  <div>
    <div class="header">hahaha</div>
    <div class="left">wx专属</div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100vh;

  @include respond-to(phone) {
    height: 100px;
  }

  @include respond-to(pc) {
    height: 200px;
  }

  background-color: rgb(139 133 133);
}

.left {
  @include respond-to(pc) {
    display: none;
  }
}
</style>
