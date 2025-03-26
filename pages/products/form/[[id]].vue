<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" />

    <div class="box-base">
      <h2 class="text-2xl font-semibold mb-2">
        {{
          $route.params.id ? t("LABELS.edit_product") : t("LABELS.add_product")
        }}
      </h2>

      <veeForm
        v-if="!loading"
        as="div"
        @submit="submit"
        :validation-schema="schema"
        :initialValues="initialValues"
        v-slot="{ meta }"
      >
        <form>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-5 mb-5">
            <div class="md:col-span-2 col-span-1">
              <InputsBaseImageInput
                name="image"
                id="image"
                accept="image/*"
                draggable
                :previewImage="initialValues?.preview"
              />
            </div>

            <InputsBaseTextInput
              name="title"
              type="text"
              :label="$t('LABELS.title')"
              :placeholder="$t('INPUTS.title')"
            />

            <InputsBaseSelectInput
              name="category"
              :label="$t('LABELS.categories')"
              :placeholder="$t('INPUTS.categories')"
              v-model:value="initialValues.category"
              searchable
              :options="categories"
            />

            <InputsBaseTextInput
              name="price"
              type="text"
              :label="$t('LABELS.price')"
              :placeholder="$t('INPUTS.price')"
            />

            <InputsBaseTextArea
              name="description"
              type="text"
              :label="$t('LABELS.description')"
              :placeholder="$t('INPUTS.description')"
              icon="fal fa-ben"
              class="md:col-span-2"
            />
          </div>

          <div class="flex items-center justify-center">
            <button
              class="!w-[250px]"
              :class="loadingBtn ? 'base-btn-white' : 'base-btn'"
              :disabled="loadingBtn"
            >
              <span v-if="loadingBtn">
                <img src="/loader.gif" alt="loader" class="w-[25px]" />
              </span>
              <span v-else>{{ $t("LABELS.confirm") }}</span>
            </button>
          </div>
        </form>
      </veeForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import { toast } from "vue3-toastify";

const {
  public: { baseURL },
} = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const items = ref([
  {
    label: t("NAV.dashboard"),
    url: "/",
  },
  {
    label: t("NAV.products"),
    url: "/products",
    // disabled: true,
  },
  {
    label: route.params.id ? t("LABELS.edit_product") : t("LABELS.add_product"),
    url: "",
    // disabled: true,
  },
]);

const { data: categories } = await useAsyncData(
  "categories",
  () =>
    $fetch("/products/categories", {
      method: "GET",
      baseURL,
    }),
  {
    transform: (res) => {
      return res.map((el, i) => {
        return {
          id: i,
          name: el,
        };
      });
    },
  }
);

const loading = ref(true);
const loadingBtn = ref(false);

const initialValues = ref({});

const schema = ref(
  yup.object().shape({
    image: !route.params.id && yup.string().label().required(t("ERRORS.image")),
    title: yup.string().required(t("ERRORS.title")),
    category: yup.object().required(t("ERRORS.category")),
    price: yup.string().required(t("ERRORS.price")),
    description: yup.string().required(t("ERRORS.description")),
  })
);

const submit = async (values) => {
  loadingBtn.value = true;

  let url;
  if (!route.params.id) {
    url = "products";
  } else {
    url = `products/${route.params.id}`;
  }

  try {
    await $fetch(url, {
      method: !route.params.id ? "POST" : "PUT",
      baseURL,
      body: {
        title: values.title,
        price: values.price,
        description: values.description,
        image: values.image,
        category: values.category.name,
      },
    });

    toast.success(t("TITLES.product_saved"));
    setTimeout(() => {
      router.push(localePath("/products"));
    }, 1500);
  } catch (err) {
    toast.error(err.message);
  }
};

const getData = async () => {
  try {
    const data = await $fetch(`products/${route.params.id}`, {
      method: "GET",
      baseURL,
    });
    initialValues.value = {
      title: data.title,
      price: data.price,
      description: data.description,
      preview: data.image,
      category: categories.value.find((el) => el.name == data.category),
    };
    loading.value = false;
  } catch (err) {
    toast.error(err.message);
    loading.value = false;
  }
};

if (route.params.id) {
  getData();
} else {
  loading.value = false;
}
</script>

<style lang="scss" scoped></style>
