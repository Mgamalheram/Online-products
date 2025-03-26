<template>
  <div>
    <VeeField :name="name" type="text" v-slot="{ field, meta }">
      <label v-if="label" :for="name">
        {{ label }}
      </label>
      <!-- :class="[!meta.valid && meta.touched && 'text-red-500']" -->

      <div
        class="input-wrapper"
        :class="[!meta.valid && meta.touched && '!border-red-500 text-red-500']"
      >
        <i v-if="icon" :class="[icon]" />

        <span
          class="fal fa-angle-right absolute end-3 top-1/2 -translate-y-1/2 transition-all"
          :class="showMenu && 'rotate-90'"
        />

        <span
          v-bind="field"
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-red-500 text-red-500 placeholder:!text-red-500',
            icon ? '!ps-10' : '!px-3',
          ]"
          class="inputMulti cursor-pointer"
          @click="
            $event.stopPropagation();
            showMenu = !showMenu;
          "
        >
          <template v-if="selectedValues.length >= 3">
            <span>{{ selectedValues.length }} items selected</span>
          </template>

          <template v-else-if="selectedValues.length">
            <span
              v-for="(value, index) in selectedValues"
              :key="index"
              class="me-1"
            >
              {{ value.name }}
              <span v-if="index !== selectedValues.length - 1"> , </span>
            </span>
          </template>

          <p
            v-else
            class="text-placeholder dark:text-textDark"
            :class="
              !meta.valid && meta.touched && '!border-red-500 text-red-500'
            "
          >
            {{ placeholder }}
          </p>
        </span>

        <transition name="fade-down">
          <div
            class="menu custom-shadow absolute top-[105%] z-[1000] max-h-[195px] min-h-[50px] w-full overflow-auto rounded-lg border bg-white p-2 transition-all dark:border-text dark:bg-darkBox"
            @click="$event.stopPropagation()"
            v-if="showMenu"
          >
            <div
              v-if="false"
              class="mb-2 flex items-center justify-between border-b px-5 py-1"
            >
              <button @click="selectAll" type="button">Select all</button>

              <button @click="deselectAll" type="button">
                <span class="fal fa-times"></span>
              </button>
            </div>
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
              @click="selectValue(item)"
              class="mb-2 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 last:mb-0 hover:bg-hover-btn active:bg-active-btn dark:hover:bg-opacity-5"
              :class="
                selectedValues.find((e) => e.id == item.id) &&
                'bg-primary-light text-primary'
              "
            >
              <span>{{ item.name }}</span>
              <span
                v-if="selectedValues.find((e) => e.id == item.id)"
                class="fal fa-check"
              ></span>
            </span>
          </div>
        </transition>
      </div>
      <VeeErrorMessage class="text-sm !text-red-500" :name="name" />
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
  icon: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  searchable: {
    type: Boolean,
    required: false,
  },
});

const inputField = useField(props.name);

const showMenu = ref(false);

const selectedValues = ref([]);

watch(
  selectedValues,
  (value) => {
    if (!value.length) {
      inputField.setValue(null);
    }
  },
  { deep: true }
);

if (inputField.value.value) {
  let arr = inputField.value.value.filter((e) =>
    props.options.map((el) => el.id == e.id && el.name == e.name)
  );
  selectedValues.value = arr;
}

const selectValue = (item) => {
  let isExist = selectedValues.value.find((el) => el.id == item.id);

  if (isExist) {
    selectedValues.value = selectedValues.value.filter(
      (el) => el.id !== item.id
    );
  } else {
    selectedValues.value.push(item);
  }

  inputField.setValue(selectedValues.value);
};

const selectAll = () => {
  selectedValues.value = props.options;
  inputField.setValue(selectedValues.value);
  showMenu.value = false;
};

const deselectAll = () => {
  selectedValues.value = [];
  inputField.setValue(null);
  showMenu.value = false;
};

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
