<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" :title="$t('NAV.products')" back="/" />

    <div class="box-base">
      <div
        class="mb-2 flex items-center justify-between lg:flex-row flex-col gap-4"
      >
        <div
          class="flex items-center lg:flex-row flex-col gap-4 lg:[auto] w-full"
        >
          <h1 class="lg:text-2xl font-semibold lg:w-[auto] w-full">
            {{ $t("NAV.products") }}
          </h1>

          <div class="lg:w-[250px] w-full">
            <InputsBaseSelectInput
              name="sort"
              :placeholder="$t('LABELS.sort')"
              :options="sorts"
              v-model:value="sort"
            />
          </div>

          <div class="lg:w-[250px] w-full">
            <InputsBaseSelectInput
              name="limit"
              :placeholder="$t('LABELS.limit')"
              :options="limitations"
              v-model:value="limit"
            />
          </div>
        </div>

        <ClientOnly>
          <NuxtLink
            :to="localePath('/products/form')"
            class="base-btn-white flex lg:!w-[180px] !w-full text-sm items-center justify-center gap-2"
          >
            <i class="fal fa-plus"></i>
            {{ $t("LABELS.add_products") }}
          </NuxtLink>
        </ClientOnly>
      </div>

      <div v-if="loading == 'success'">
        <template v-if="rows?.length > 0">
          <DataTable
            v-model:selection="selectedRow"
            :value="rows"
            removableSort
          >
            <Column selectionMode="multiple" class="w-[1rem]"></Column>

            <Column field="image" :header="$t('LABELS.image')">
              <template #body="slotProps">
                <Image
                  :src="slotProps.data.image"
                  :alt="slotProps.data.title"
                  preview
                  imageClass="w-[40px] h-[40px] object-contain rounded-full"
                  class="h-[40px] w-[40px] rounded-full object-contain shadow"
                />
              </template>
            </Column>

            <Column field="title" :header="$t('LABELS.title')">
              <template #body="slotProps">
                <p class="w-[200px] line-clamp-2">
                  {{ slotProps.data.title }}
                </p>
              </template>
            </Column>

            <Column field="price">
              <template #header>
                <p class="flex items-center justify-center w-full">
                  {{ $t("LABELS.price") }}
                </p>
              </template>

              <template #body="slotProps">
                <p class="text-center">
                  {{ slotProps.data.price }} {{ $t("LABELS.dollar") }}
                </p>
              </template>
            </Column>

            <Column field="category">
              <template #header>
                <p class="flex items-center justify-center w-full">
                  {{ $t("LABELS.category") }}
                </p>
              </template>

              <template #body="slotProps">
                <p class="text-center">
                  {{ slotProps.data.category }}
                </p>
              </template>
            </Column>

            <Column field="rating">
              <template #header>
                <p class="flex items-center justify-center w-full">
                  {{ $t("LABELS.rating") }}
                </p>
              </template>

              <template #body="slotProps">
                <div class="flex items-center justify-center gap-2">
                  <i
                    v-for="i in Math.floor(slotProps.data.rating.rate)"
                    :key="i"
                    class="fas fa-star text-primary"
                  ></i>

                  <i
                    v-if="!Number.isInteger(slotProps.data.rating.rate)"
                    class="fas fa-star-half-alt text-primary"
                  ></i>

                  <i
                    v-for="n in Math.floor(5 - slotProps.data.rating.rate)"
                    :key="n"
                    class="fal fa-star text-primary"
                  ></i>
                </div>
              </template>
            </Column>

            <Column field="description">
              <template #header>
                <p class="flex items-center justify-center w-full">
                  {{ $t("LABELS.details") }}
                </p>
              </template>
              <template #body="slotProps">
                <div class="flex items-center gap-2 justify-center">
                  <NuxtLink
                    :to="localePath(`/products/form/${slotProps.data.id}`)"
                  >
                    <i class="fas fa-edit"></i>
                  </NuxtLink>

                  <SharedDeleter
                    :url="`/products/${slotProps.data.id}`"
                    @reload="refresh()"
                  />

                  <button type="button" @click="showDetails(slotProps.data)">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>

        <SharedNoData v-else />
      </div>

      <p v-else class="h-[300px] w-full flex items-center justify-center">
        <SharedLoader />
      </p>
    </div>

    <Dialog
      v-model:visible="visibleDetailsModal"
      class="md:w-[768px] w-[95%] !overflow-y-auto"
      modal
      :header="$t('LABELS.product_details')"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="md:col-span-4 col-span-12">
          <Image
            :src="currentProduct?.image"
            :alt="currentProduct?.title"
            preview
            imageClass="h-[225px] object-cover rounded-lg"
            class="h-[225px] object-cover border rounded-lg"
          />
        </div>

        <div class="md:col-span-8 col-span-12">
          <h3 class="font-semibold mb-2">
            {{ currentProduct?.title }}
          </h3>

          <p class="text-gray-600 dark:text-gray-200 mb-2">
            <span class="font-semibold">{{ $t("LABELS.price") }}:</span>

            {{ currentProduct?.price }} {{ t("LABELS.dollar") }}
          </p>

          <p class="text-gray-600 dark:text-gray-200 mb-2">
            <span class="font-semibold"> {{ $t("LABELS.category") }}: </span>

            {{ currentProduct?.category }}
          </p>

          <div class="mb-2 flex items-center gap-2">
            <span class="font-semibold"> {{ $t("LABELS.rating") }}: </span>

            <div class="flex items-center gap-2">
              <i
                v-for="i in Math.floor(currentProduct.rating.rate)"
                :key="i"
                class="fas fa-star text-primary"
              ></i>

              <i
                v-if="!Number.isInteger(currentProduct.rating.rate)"
                class="fas fa-star-half-alt text-primary"
              ></i>

              <i
                v-for="n in Math.floor(5 - currentProduct.rating.rate)"
                :key="n"
                class="fal fa-star text-primary"
              ></i>
            </div>
          </div>

          <div class="mb-2 flex items-center gap-2">
            <button
              @click="currentProductQuantity = currentProductQuantity + 1"
              class="base-btn !w-[50px]"
            >
              <i class="far fa-plus"></i>
            </button>

            <input
              type="number"
              class="border dark:border-gray-600 outline-none w-[50px] h-[40px] inline-block rounded-lg text-center appearance-none bg-transparent"
              v-model="currentProductQuantity"
            />

            <button
              @click="currentProductQuantity = currentProductQuantity - 1"
              class="base-btn !w-[50px]"
              :disabled="currentProductQuantity <= 1"
            >
              <i class="far fa-minus"></i>
            </button>
          </div>

          <div class="mt-4">
            <button
              @click="addToCart(currentProduct, currentProductQuantity)"
              class="base-btn-white !w-[200px]"
            >
              {{ $t("LABELS.add_to_cart") }}
            </button>
          </div>
        </div>
      </div>

      <p class="text-gray-600 dark:text-gray-200">
        <span class="font-semibold">{{ $t("LABELS.description") }}:</span>

        {{ currentProduct?.description }}
      </p>
    </Dialog>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Image from "primevue/image";
import Dialog from "primevue/dialog";

const {
  public: { baseURL },
} = useRuntimeConfig();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

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
]);

const sorts = [
  {
    id: "desc",
    name: t("LABELS.desc"),
  },
  {
    id: "asc",
    name: t("LABELS.asc"),
  },
];

const limitations = [
  {
    id: 5,
    name: "5",
  },
  {
    id: 10,
    name: "10",
  },
  {
    id: 15,
    name: "15",
  },
  {
    id: 20,
    name: "20",
  },
];

const limit = ref(null);
const sort = ref(null);

watch(
  () => sort.value,
  (val) => {
    if (val?.id) {
      router.push({
        path: "",
        query: Object.assign({}, route.query, {
          sort: val?.id,
        }),
      });
    }
  },
  { deep: true }
);

watch(
  () => limit.value,
  (val) => {
    if (val?.id) {
      router.push({
        path: "",
        query: Object.assign({}, route.query, {
          limit: val?.id,
        }),
      });
    }
  },
  { deep: true }
);

const {
  data: rows,
  status: loading,
  refresh,
} = await useAsyncData("products", () =>
  $fetch("/products", {
    method: "GET",
    params: {
      limit: route.query?.limit,
      sort: route.query?.sort,
    },
    baseURL,
  })
);

watch(
  () => route.path,
  () => {
    refresh();
  },
  { deep: true }
);

sort.value = sorts.find((el) => el.id == route.query.sort);
limit.value = limitations.find((el) => el.id == route.query.limit);

const selectedRow = ref(null);

watch(
  () => selectedRow.value,
  (arr) => {
    console.log(arr);
  }
);

const visibleDetailsModal = ref(false);
const currentProduct = ref(null);
const currentProductQuantity = ref(1);

const showDetails = (product) => {
  visibleDetailsModal.value = true;
  currentProduct.value = product;
};

watch(
  () => visibleDetailsModal.value,
  (val) => {
    if (!val) {
      visibleDetailsModal.value = false;
      currentProductQuantity.value = 1;
    }
  },
  { deep: true }
);

const addToCart = (product, quantity) => {
  console.log(product, quantity);
};
</script>
