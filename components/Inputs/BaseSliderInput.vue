<template>
  <div>
    <VeeField :name="name" type="number" v-slot="{ field, meta }">
      <label
        class="mb-5"
        v-if="label"
        :for="name"
      >
        {{ label }}
      </label>
        <!-- :class="[!meta.valid && meta.touched && 'text-red-500']" -->

      <div class="h-[40px] flex items-center justify-center gap-3">
        <Slider
          v-bind="field"
          :name="name"
          :id="name"
          v-model="value"
          class="ms-2 w-full"
          :max="max"
        />

        <span>
          {{ value }}
        </span>
      </div>

      <VeeErrorMessage class="text-sm text-red-500" :name="name" />
    </VeeField>
  </div>
</template>

<script setup>
import Slider from "primevue/slider";

import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
});
const inputField = useField(props.name);

const value = ref(0);

watch(
  () => props.value,
  (val) => {
    if (val > 0) {
      inputField.setValue(val);
      value.value = val;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => value.value,
  (val) => {
    if (val == 0) {
      inputField.setValue(null);
      value.value = null;
    }
  },
  { deep: true }
);

watch(
  () => inputField.value.value,
  (val) => {
    value.value = val;
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
