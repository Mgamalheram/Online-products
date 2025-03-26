<template>
  <button
    class="flex items-center justify-center gap-2"
    type="button"
    @click="visible = true"
  >
    <i :class="icon ? icon : 'fas fa-trash-alt'"></i>

    <slot name="desc" />
  </button>

  <Dialog
    v-model:visible="visible"
    modal
    :header="header ? header : 'Delete'"
    class="md:w-[28rem] w-[95%]"
  >
    <!-- :style="{ width: '28rem' }" -->
    <span class="p-text-secondary mb-5 block">
      {{ bodyText ? bodyText : "Are you sure you want to delete this!" }}
    </span>

    <div class="flex items-center justify-center gap-2">
      <button
        type="button"
        class="base-btn-white flex-grow"
        @click="visible = false"
      >
        Cancel
      </button>

      <button
        type="button"
        class="base-btn flex-grow"
        @click="
          submit();
          visible = false;
        "
      >
        Confirm
      </button>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import { toast } from "vue3-toastify";

const props = defineProps({
  url: {
    type: String,
    required: false,
  },
  method: {
    type: String,
    required: false,
  },
  body: {
    type: Object,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  header: {
    type: String,
    required: false,
  },
  bodyText: {
    type: String,
    required: false,
  },
});

const {
  public: { baseURL },
} = useRuntimeConfig();

const visible = ref(false);

const submit = async () => {
  if (props.url) {
    try {
      const data = await $fetch(props.url, {
        method: props.method ? props.method : "DELETE",
        baseURL,
        body: props.body ? props.body : null,
      });

      toast.success("Item deleted successfully");
      emit("reload");
    } catch (err) {
      console.log(err);
    }
  } else {
    emit("remove");
  }
};

const emit = defineEmits(["reload", "remove"]);
</script>
