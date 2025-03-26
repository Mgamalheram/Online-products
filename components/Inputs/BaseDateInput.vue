<template>
  <div>
    <VeeField :name="name" type="date" v-slot="{ field, meta }">
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
          type="date"
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!ps-10 !pe-5' : '!px-3',
          ]"
          :max="formatDate(max)"
          :min="formatDate(min)"
        />
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

function formatDate(inputDate) {
  if (inputDate) {
    let formattedDate = new Date(inputDate).toISOString().split("T")[0];

    return formattedDate;
  }
}

if (inputField.value.value) {
  inputField.setValue(formatDate(inputField.value.value));
}
</script>

<style lang="scss" scoped></style>
