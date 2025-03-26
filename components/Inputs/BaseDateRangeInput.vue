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

        <Calendar
          v-model="dates"
          v-bind="field"
          selectionMode="range"
          :manualInput="false"
          class="!w-full h-full"
          :inputClass="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!ps-10 !pe-5' : '!px-3',
          ]"
          :name="name"
          :id="name"
          :maxDate="formatDate(max)"
          :minDate="formatDate(min)"
          :disabledDays="disabledDays"
          :placeholder="placeholder"
        />
      </div>
      <VeeErrorMessage class="text-sm text-red-500" :name="name" />
    </VeeField>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import Calendar from "primevue/calendar";

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
  placeholder: {
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
  disabledDays: {
    type: Array,
    required: false,
  },
});

const inputField = useField(props.name);
const dates = ref(null);

function formatDate(inputDate) {
  if (inputDate) {
    let formattedDateZero = new Date(inputDate[0]);
    let formattedDateOne = new Date(inputDate[1]);

    return [formattedDateZero, formattedDateOne];
  }
}
function formatDateAsFormated(inputDate) {
  if (inputDate) {
    let formattedDateZero =
      inputDate[0] && new Date(inputDate[0]).toISOString().split("T")[0];
    let formattedDateOne =
      inputDate[1] && new Date(inputDate[1]).toISOString().split("T")[0];

    let data = [formattedDateZero, formattedDateOne];

    return [
      inputDate[0] &&
        new Date(new Date(data[0]).setDate(new Date(data[0]).getDate() + 1))
          .toISOString()
          .split("T")[0],
      inputDate[1] &&
        new Date(new Date(data[1]).setDate(new Date(data[1]).getDate() + 1))
          .toISOString()
          .split("T")[0],
    ];
  }
}

if (inputField.value.value && inputField.value.value?.length > 0) {
  dates.value = formatDate(inputField.value.value);
  inputField.setValue(formatDateAsFormated(inputField.value.value));
}

watch(
  () => dates.value,
  (val) => {
    inputField.setValue(formatDateAsFormated(val));
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
