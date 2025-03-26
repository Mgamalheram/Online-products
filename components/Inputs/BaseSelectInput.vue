<template>
  <div>
    <VeeField :name="name" type="text" v-slot="{ field, meta }">
      <label
        v-if="label"
        :for="name"
        :class="[!meta.valid && meta.touched && 'text-red-500']"
      >
        {{ label }}
      </label>

      <div
        class="input-wrapper"
        :class="[
          !meta.valid && meta.touched && '!border-red-500 text-red-500',
          disabled && 'disabled',
        ]"
      >
        <i v-if="icon" :class="[icon]" />

        <span
          class="fal fa-angle-right absolute end-3 top-1/2 z-[10] -translate-y-1/2 transition-all"
          :class="showMenu && !disabled && 'rotate-90'"
        />

        <input
          v-bind="field"
          type="text"
          readonly
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!ps-10' : '!px-3',
          ]"
          :placeholder="placeholder"
          class="cursor-pointer"
          @click="
            $event.stopPropagation();
            showMenu = !showMenu;
          "
          ref="inputSelect"
          :value="selectedValue?.name"
          :disabled="disabled"
        />
        <transition name="fade-down">
          <div
            class="menu custom-shadow absolute top-[105%] z-[1000] max-h-[155px] min-h-[50px] w-full overflow-auto rounded-lg border bg-white dark:bg-dark-body p-2 transition-all dark:border-gray-500"
            @click="$event.stopPropagation()"
            v-if="showMenu && !disabled"
          >
            <div v-if="searchable" class="mb-2">
              <input
                class="search-input"
                placeholder="Search..."
                v-model="searchedValue"
              />
            </div>

            <span
              v-for="item in items"
              :key="item.id"
              @click="
                selectedValue = item;
                inputField.setValue(item);
                $emit('update:value', item);
                showMenu = false;
              "
              class="mb-2 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 last:mb-0 hover:bg-hover-btn active:bg-active-btn dark:hover:bg-opacity-5"
              :class="
                selectedValue?.id == item.id
                  ? 'bg-primary-light text-primary'
                  : 'text-black dark:text-white'
              "
            >
              <span>{{ item.name }}</span>
              <span
                v-if="selectedValue?.id == item.id"
                class="fal fa-check"
              ></span>
            </span>
          </div>
        </transition>
      </div>
      <VeeErrorMessage class="text-sm text-red-500" :name="name" />
    </VeeField>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emit = defineEmits(["update:value"]);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  },
  value: {
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  searchable: {
    type: Boolean,
    required: false,
  },
});

const inputField = useField(props.name);
const inputSelect = ref(null);

const showMenu = ref(false);

const selectedValue = ref(null);

watch(
  () => props.value,
  (val) => {
    if (val) {
      let item = props.options.find((item) => item.id == val.id);
      if (item) {
        inputField.setValue(item);
        selectedValue.value = item;
      }
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.options,
  (bigArr) => {
    if (bigArr.length > 0) {
      let item = bigArr.find((item) => item.id == props.value?.id);
      if (item) {
        inputField.setValue(item);
        selectedValue.value = item;
      }
    }
  },
  { deep: true, immediate: true }
);

const searchedValue = ref("");

const items = computed(() => {
  if (searchedValue.value) {
    return props.options.filter((item) =>
      item.name.toLowerCase().includes(searchedValue.value.toLowerCase())
    );
  } else {
    return props.options;
  }
});

onMounted(() => {
  document.addEventListener("click", () => {
    showMenu.value = false;
  });
});
</script>

<style lang="scss" scoped>
.fade-down-enter-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-down-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
}
</style>
