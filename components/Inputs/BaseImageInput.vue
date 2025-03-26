<template>
  <div>
    <VeeField
      :name="name"
      type="file"
      v-slot="{ field, meta }"
      v-model="imageFile"
    >
      <label
        @dragover.prevent="activeDrag = true"
        @dragleave="activeDrag = false"
        @drop.prevent="uploadDroppedFile"
        :for="id"
        class="relative mx-auto flex h-[250px] w-full cursor-pointer items-center justify-center rounded-sm border"
        :class="
          !meta.valid && meta.touched
            ? ' border-red-500'
            : 'border dark:border-text'
        "
      >
        <div
          class="flex h-[250px] w-full flex-col items-center justify-center gap-[10px] p-3"
          v-if="previewImageSrc"
        >
          <img
            :src="previewImageSrc"
            :alt="name"
            class="h-[180px] w-full rounded-lg object-cover"
          />

          <!-- <button
            class="absolute -end-4 -top-4 size-8 rounded-full bg-primary-light text-primary"
            type="button"
            @click.prevent="
              imageFile = null;
              previewImageSrc = null;
            "
          >
            <i class="fal fa-times"></i>
          </button> -->
          <button
            @click.prevent="
              imageFile = null;
              previewImageSrc = null;
            "
            type="button"
            class="base-btn !h-[60px]"
          >
            {{ $t("LABELS.remove_image") }}
          </button>
        </div>

        <div v-else>
          <div v-if="draggable">
            <div class="mx-auto mb-3 w-fit">
              <label
                :for="id"
                class="flex size-10 cursor-pointer items-center justify-center rounded-sm bg-hover-btn transition-all hover:bg-active-btn dark:bg-opacity-10"
              >
                <i class="fal fa-cloud-upload"></i>
              </label>
            </div>

            <p
              class="mb-5 text-center font-medium dark:text-white"
              :class="
                !meta.valid && meta.touched
                  ? 'text-red-500'
                  : 'text-[#000000A8]'
              "
            >
              {{
                activeDrag
                  ? $t("LABELS.leaveFileHere")
                  : $t("LABELS.Click_or_Drag_image_to_Upload")
              }}
            </p>

            <label
              :for="id"
              class="mx-auto flex w-fit cursor-pointer items-center justify-center rounded-sm !bg-primary-light p-2 text-primary"
            >
              {{ $t("LABELS.BrowserImages") }}
            </label>
          </div>

          <div v-else>
            <div class="mx-auto mb-3 w-fit">
              <img src="/icons/image-placeholder.png" alt="drag" />
            </div>
            <p
              class="text-center font-medium"
              :class="
                !meta.valid && meta.touched
                  ? 'text-red-500'
                  : 'text-[#000000A8]'
              "
            >
              Click To Upload
            </p>
          </div>
        </div>

        <input
          type="file"
          v-bind="field"
          :name="name"
          :id="id"
          class="hidden"
          ref="uploadedFile"
          @change="uploadFile"
          :accept="accept"
        />
      </label>

      <div class="mx-auto w-[220px] text-center">
        <VeeErrorMessage class="text-sm text-red-500" :name="name" />
      </div>
    </VeeField>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  multiple: {
    type: Boolean,
  },
  accept: {
    type: String,
  },
  draggable: {
    type: Boolean,
  },
  previewImage: {
    type: String,
  },
  acceptAttachments: {
    type: Boolean,
  },
});

const inputField = useField(props.name);

const imageFile = ref(null);
const previewImageSrc = ref(null);
if (props.previewImage) {
  previewImageSrc.value = props.previewImage;
}

const uploadedFile = ref("uploadedFile");
const uploadFile = () => {
  const files = uploadedFile.value.files;
  previewImageSrc.value = URL.createObjectURL(files[0]);

  if (props.acceptAttachments) {
    uploadImageAsAttachments(files[0]);
  }
};

const uploadDroppedFile = (event) => {
  if (props.draggable) {
    const files = event.dataTransfer.files;
    imageFile.value = files[0];
    previewImageSrc.value = URL.createObjectURL(files[0]);
    activeDrag.value = false;

    if (props.acceptAttachments) {
      uploadImageAsAttachments(files[0]);
    }
  }
};

const uploadImageAsAttachments = (file) => {
  inputField.setValue("image_id");
};

const activeDrag = ref(false);
</script>

<style lang="scss" scoped></style>
