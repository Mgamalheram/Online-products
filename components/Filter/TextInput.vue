<template>
  <div class="input-wrapper">
    <i v-if="icon" :class="[icon]" />

    <input
      :type="type"
      :name="name"
      :id="name"
      :class="[icon ? '!ps-10' : '!px-3']"
      :placeholder="placeholder"
      :value="value"
      @change="
        searchedValue = $event.target?.value;
        router.push({
          path: '',
          query: Object.assign({}, route.query, {
            search: $event.target.value,
          }),
        });
      "
    />
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
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
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
});

const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped></style>
