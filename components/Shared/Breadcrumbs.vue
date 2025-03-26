<template>
  <div
    class="mb-2 flex w-full flex-col overflow-hidden gap-4 !p-2 !bg-transparent box-shadow-none"
  >
    <div v-if="title || back" class="flex items-center gap-4">
      <NuxtLink v-if="back" :to="localePath(back)">
        <i :class="`far fa-arrow-${locale == 'en' ? 'left' : 'right'}`"></i>
      </NuxtLink>

      <h4 v-if="title" class="sm:text-3xl font-semibold text-primary">
        {{ title }}
      </h4>
    </div>

    <Breadcrumb class="flex-grow !bg-transparent !p-0" :model="items">
      <template #item="{ item }">
        <router-link :to="item.url">
          <span
            class="sm:!text-sm !text-xs font-semibold"
            :class="item.disabled && 'text-forth'"
            >{{ item.label }}</span
          >
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup>
import Breadcrumb from "primevue/breadcrumb";
const { locale } = useI18n();
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  back: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
