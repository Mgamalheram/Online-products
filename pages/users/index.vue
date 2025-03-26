<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" :title="$t('NAV.users')" back="/" />

    <div class="box-base">
      <div class="mb-2 flex items-center justify-between lg:flex-row flex-col gap-4">
        <div class="flex items-center lg:flex-row flex-col gap-4 lg:[auto] w-full">
          <h1 class="lg:text-2xl font-semibold lg:w-[auto] w-full">{{ $t("NAV.users") }}</h1>

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
            :to="localePath('/users/form')"
            class="base-btn-white flex max-w-[180px] text-sm items-center justify-center gap-2"
          >
            <i class="fal fa-plus"></i>
            {{ $t("LABELS.add_users") }}
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

            <Column field="name" :header="$t('LABELS.name')">
              <template #body="slotProps">
                <p class="w-[200px]">
                  {{ slotProps.data.name.firstname }}
                  {{ slotProps.data.name.lastname }}
                </p>

                <p class="w-[200px]">
                  {{ slotProps.data.email }}
                </p>
              </template>
            </Column>

            <Column field="phone" :header="$t('LABELS.phone')">
              <template #body="slotProps">
                <p class="w-[200px]">
                  {{ slotProps.data.phone }}
                </p>
              </template>
            </Column>

            <Column field="username" :header="$t('LABELS.username')">
              <template #body="slotProps">
                <p class="w-[200px]">
                  {{ slotProps.data.username }}
                </p>
              </template>
            </Column>

            <Column field="password" :header="$t('LABELS.password')">
              <template #body="slotProps">
                <p class="w-[200px]">
                  {{ slotProps.data.password }}
                </p>
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
                    :to="localePath(`/users/form/${slotProps.data.id}`)"
                  >
                    <i class="fas fa-edit"></i>
                  </NuxtLink>

                  <SharedDeleter
                    :url="`/users/${slotProps.data.id}`"
                    @reload="refresh()"
                  />

                  <NuxtLink
                    :to="localePath(`/users/show/${slotProps.data.id}`)"
                  >
                    <i class="fas fa-eye"></i>
                  </NuxtLink>
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
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

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
    label: t("NAV.users"),
    url: "/users",
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
} = await useAsyncData("users", () =>
  $fetch("/users", {
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
</script>
