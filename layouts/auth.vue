<template>
  <div class="h-screen flex items-center justify-center custom-bg-linear">
    <div class="xl:w-[35%] lg:w-1/2 w-[95%] bg-white dark:bg-dark-body p-5 rounded-2xl">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.custom-bg-linear {
  background: linear-gradient(
    180deg,
    rgb(60, 165, 235) 0%,
    rgb(85, 95, 230) 100%
  );
}
</style>
