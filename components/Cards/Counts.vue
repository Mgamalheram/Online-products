<template>
  <NuxtLink
    class="bg-white dark:bg-box-dark rounded-sm border-b-[3px] px-4 py-2 shadow cursor-pointer block"
    :to="localePath(route)"
    :style="{ borderColor: color }"
  >
    <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-3">
      {{ title }}
    </h3>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i
          class="far text-3xl"
          :class="`${count > old_count ? 'fa-angle-up' : 'fa-angle-down'}`"
          :style="{ color: color }"
        ></i>

        <span class="text-3xl font-semibold">
          {{ count }}
        </span>
      </div>

      <div v-if="percentage">
        <Knob
          v-model="percentage"
          readonly
          :valueColor="color"
          valueTemplate="{value}%"
          :strokeWidth="10"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import Knob from "primevue/knob";

const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, required: true },
  old_count: { type: Number, required: true },
  color: { type: String, default: "#007bff" },
  route: { type: String, required: true },
});

const percentage = computed(
  () => +(((props.count - props.old_count) / props.old_count) * 100).toFixed(0)
);
</script>

<style lang="scss">
.p-knob {
  svg {
    width: 60px;
    height: 60px;
  }
}
</style>
