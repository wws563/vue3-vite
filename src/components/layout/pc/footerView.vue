<template>
  <div class="footer">
    {{ tick.date.format("YYYY-MM-DD HH:mm:ss") }}
  </div>
</template>

<script setup lang="ts">
const { $dayjs } = getCurrentInstance().appContext.config.globalProperties;
let tick = reactive({ date: $dayjs() });

function updateDate() {
  setTimeout(() => {
    tick.date = tick.date.add(1, "s");
    updateDate();
  }, 1000);
}

updateDate();
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
  height: 100%;
  background-color: var(--bg-color-around);
  @include flex-center();
}
</style>
