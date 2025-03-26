<template>
  <div>
    <VeeField :name="name" type="time" v-slot="{ field, meta }">
      <label
        v-if="label"
        :for="name"
      >
        {{ label }}
      </label>
        <!-- :class="[!meta.valid && meta.touched && 'text-red-500']" -->

      <div
        class="input-wrapper"
        :class="[!meta.valid && meta.touched && '!border-red-500 text-red-500']"
      >
        <i v-if="icon" :class="[icon]" />

        <input
          v-bind="field"
          type="time"
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!pe-5 !ps-10' : '!px-3',
          ]"
          :max="max"
          :min="min"
        />
      </div>
      <VeeErrorMessage class="text-sm text-red-500 " :name="name" />
    </VeeField>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  min: {
    type: Date,
    required: false,
  },
  max: {
    type: Date,
    required: false,
  },
});

const inputField = useField(props.name);

// if (inputField.value.value) {
//   inputField.setValue(inputField.value.value);
// }
</script>

<style lang="scss" scoped></style>
