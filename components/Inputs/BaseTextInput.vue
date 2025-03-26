<template>
  <div>
    <VeeField :name="name" :type="currentType" v-slot="{ field, meta }">
      <label
        v-if="label"
        :for="name"
        :class="[!meta.valid && meta.touched && 'text-red-500']"
      >
        {{ label }}
      </label>

      <div
        class="input-wrapper"
        :class="`${
          !meta.valid && meta.touched && '!border-red-500 text-red-500'
        } ${classes} ${disabled ? 'disabled' : ''}`"
      >
        <i v-if="icon" :class="[icon]" />

        <input
          v-bind="field"
          :type="currentType"
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!ps-10' : '!px-3',
          ]"
          class="appearance-none"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="$emit('update:value', $event.target.value)"
        />

        <div
          v-if="type == 'password'"
          class="absolute end-10 top-1/2 -translate-y-1/2"
        >
          <button
            :disabled="disabled"
            type="button"
            @click="
              currentType == 'password'
                ? (currentType = 'text')
                : (currentType = 'password')
            "
          >
            <i
              :class="`far fa-eye${currentType == 'password' ? '-slash' : ''}`"
            ></i>
          </button>
        </div>
      </div>
      <VeeErrorMessage class=" text-sm text-red-500" :name="name" />
    </VeeField>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
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
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  classes: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  value: {
    required: false,
  },
});

const inputField = useField(props.name);

const currentType = ref(props.type);

// =================================================================
watch(
  () => props.value,
  (val) => {
    if (val) {
      inputField.setValue(val);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
