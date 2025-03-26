<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" :title="$t('NAV.categories')" back="/" />

    <div class="box-base">
      <div class="mb-2 flex items-center justify-between">
        <h1 class="md:text-2xl font-semibold">{{ $t("NAV.categories") }}</h1>

        <ClientOnly>
          <button
            type="button"
            disabled
            class="base-btn-white flex max-w-[180px] text-sm items-center justify-center gap-2 disabled:!bg-transparent disabled:!text-primary disabled:cursor-not-allowed"
          >
            <i class="fal fa-plus"></i>
            {{ $t("LABELS.add_categories") }}
          </button>
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

            <Column field="name" :header="$t('LABELS.name')"></Column>

            <Column field="description">
              <template #header>
                <p class="flex items-center justify-center w-full">
                  {{ $t("LABELS.details") }}
                </p>
              </template>
              <template #body="slotProps">
                <NuxtLink
                  :to="
                    localePath(
                      `/categories/show-products?category=${slotProps.data.name}`
                    )
                  "
                  class="w-full block text-center"
                >
                  <i class="fas fa-eye"></i>
                </NuxtLink>
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
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const {
  public: { baseURL },
} = useRuntimeConfig();

const { t } = useI18n();

const items = ref([
  {
    label: t("NAV.dashboard"),
    url: "/",
  },
  {
    label: t("NAV.categories"),
    url: "/categories",
    // disabled: true,
  },
]);

const { data: rows, status: loading } = await useAsyncData(
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

const selectedRow = ref(null);

watch(
  () => selectedRow.value,
  (arr) => {
    console.log(arr);
  }
);
</script>
