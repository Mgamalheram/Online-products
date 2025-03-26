<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" :title="$t('NAV.user')" back="/users" />

    <div
      class="max-w-xl mx-auto bg-white rounded overflow-hidden shadow-lg p-6"
    >
      <h2 class="text-xl font-bold mb-2">
        {{ user.name.firstname }} {{ user.name.lastname }}
      </h2>

      <p class="text-gray-600 mb-2">{{ user.email }}</p>

      <p class="text-gray-600 mb-2">{{ user.phone }}</p>

      <div class="border-t border-gray-200 mt-4 pt-4">
        <h3 class="text-lg font-semibold mb-2">{{ $t("LABELS.address") }}</h3>

        <p class="text-gray-600 mb-1">
          {{ user.address.number }} {{ user.address.street }}
        </p>

        <p class="text-gray-600 mb-1">
          {{ user.address.city }}, {{ user.address.zipcode }}
        </p>

        <p class="text-gray-600">
          {{ $t("LABELS.latitude") }}: {{ user.address.geolocation.lat }},
          {{ $t("LABELS.longitude") }} :
          {{ user.address.geolocation.long }}
        </p>
      </div>

      <p class="text-sm text-gray-500 mt-4">ID: {{ user.id }}</p>
    </div>
  </div>
</template>

<script setup>
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
  },
  {
    label: t("NAV.user"),
    url: "",
    // disabled: true,
  },
]);

const { data: user } = await useAsyncData("user", () =>
  $fetch(`users/${route.params.id}`, {
    method: "GET",
    baseURL,
  })
);
</script>

<style lang="scss" scoped></style>
