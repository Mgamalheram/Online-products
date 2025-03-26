<template>
  <div>
    <VeeField :name="name" type="textarea" v-slot="{ field, meta }">
      <label
        :class="[!meta.valid && meta.touched && 'text-red-500']"
        v-if="label"
        :for="name"
      >
        {{ label }}
      </label>
      <!-- :class="[!meta.valid && meta.touched && 'text-red-500']" -->

      <div
        class="input-wrapper !h-[100px]"
        :class="[!meta.valid && meta.touched && '!border-red-500 text-red-500']"
      >
        <textarea
          v-bind="field"
          :name="name"
          :id="name"
          class="resize-none px-2 py-1"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
          ]"
          :placeholder="placeholder"
        ></textarea>
      </div>
      <VeeErrorMessage class="text-sm text-red-500" :name="name" />
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
  placeholder: {
    type: String,
    required: true,
  },
});

const inputField = useField(props.name);
</script>

<style lang="scss" scoped></style>
