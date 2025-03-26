<template>
  <div>
    <h5 class="font-bold text-gray-500 mb-5">
      {{ $t("TITLES.ecommerce_dashboard") }}
    </h5>

    <div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mb-5">
      <CardsCounts
        :title="$t('TITLES.new_users')"
        :count="users?.length"
        :old_count="9"
        route="/users"
      />

      <CardsCounts
        :title="$t('TITLES.new_categories')"
        :count="categories?.length"
        :old_count="3"
        color="#ff1754"
        route="/categories"
      />

      <CardsCounts
        :title="$t('TITLES.new_products')"
        :count="products?.length"
        :old_count="16"
        color="#dcaf4b"
        route="/products"
      />

      <CardsCounts
        :title="$t('TITLES.new_users_fake')"
        :count="500"
        :old_count="400"
        color="#32a073"
        route="/"
      />
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div
        class="lg:col-span-8 col-span-12 rounded-sm px-4 py-2 shadow"
        :class="[themeClass]"
      >
        <ClientOnly>
          <div v-if="!loadingChart">
            <h4 class="text-2xl font-medium">
              {{ $t("LABELS.productsInCategory") }}
            </h4>

            <ApexChart
              type="bar"
              height="400"
              :options="bar.chartOptions"
              :series="bar.series"
            ></ApexChart>
          </div>
        </ClientOnly>
      </div>

      <div
        class="lg:col-span-4 col-span-12 shadow rounded-sm px-4 py-2"
        :class="[themeClass]"
      >
        <ClientOnly>
          <div v-if="!loadingChart">
            <h4 class="text-2xl font-medium">
              {{ $t("LABELS.productsInCategory") }}
            </h4>

            <ApexChart
              type="donut"
              height="400"
              :options="donut.chartOptionsApex"
              :series="donut.series"
            ></ApexChart>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const {
  public: { baseURL },
} = useRuntimeConfig();
const colorMode = useColorMode();

const { data: categories } = await useAsyncData("categories", () =>
  $fetch("/products/categories", {
    method: "GET",
    baseURL,
  })
);

const { data: products } = await useAsyncData("products", () =>
  $fetch("/products", {
    method: "GET",
    baseURL,
  })
);

const { data: users } = await useAsyncData("users", () =>
  $fetch("/users", {
    method: "GET",

    baseURL,
  })
);

const bar = ref({
  series: [
    {
      name: t("LABELS.productsInCategory"),
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      height: 400,
      type: "bar",
    },
    colors: [],
    plotOptions: {
      bar: {
        columnWidth: "30%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
      title: {
        text: "Categories",
        style: {
          fontSize: "",
          color: "",
        },
      },
      labels: {
        style: {
          colors: [],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Products",
        style: {
          fontSize: "",
          color: "",
        },
      },
      labels: {
        style: {
          colors: [],
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (value) {
          return `${value} ${t("LABELS.products")}`;
        },
      },
    },
  },
});

const donut = ref({
  series: [44, 55, 13, 33],
  chartOptionsApex: {
    chart: {
      type: "donut",
    },
    labels: ["Category 10", "Category 2", "Category 3", "Category 4"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      formatter: (seriesName, opts) => {
        return `<div class="flex items-center justify-between text-base font-semibold dark:text-white">
                  <span class="font-bold font-inter">${seriesName}:</span>
                  <span>${opts.w.globals.series[opts.seriesIndex]}</span>
                </div>`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
          width: "35px", // This sets the width of the donut bars
        },
      },
    },
  },
});

const categoryAndItsProducts = ref({});
products.value.forEach((product, idx, arr) => {
  let category = product.category;
  categoryAndItsProducts.value[category] = arr.filter(
    (el) => el.category == category
  );
});

bar.value.series[0].data = Object.keys(categoryAndItsProducts.value).map(
  (el) => {
    return categoryAndItsProducts.value[el].length;
  }
);
bar.value.chartOptions.xaxis.categories = categories.value;

donut.value.series = Object.keys(categoryAndItsProducts.value).map((el) => {
  return categoryAndItsProducts.value[el].length;
});
donut.value.chartOptionsApex.labels = categories.value;

const themeClass = ref("light");
const loadingChart = ref(true);
watch(
  () => colorMode.preference,
  (val) => {
    themeClass.value = val == "dark" ? "bg-box-dark" : "bg-white";

    loadingChart.value = true;

    if (val === "dark") {
      bar.value.chartOptions.xaxis.labels.style.colors = "#FFFFFF";
      bar.value.chartOptions.xaxis.title.style.color = "#FFFFFF";
      bar.value.chartOptions.yaxis.labels.style.colors = "#FFFFFF";
      bar.value.chartOptions.yaxis.title.style.color = "#FFFFFF";
      bar.value.chartOptions.tooltip.theme = "dark";
    } else {
      bar.value.chartOptions.xaxis.labels.style.colors = "#000000";
      bar.value.chartOptions.xaxis.title.style.color = "#000000";
      bar.value.chartOptions.yaxis.labels.style.colors = "#000000";
      bar.value.chartOptions.yaxis.title.style.color = "#000000";
      bar.value.chartOptions.tooltip.theme = "light";
    }

    setTimeout(() => {
      loadingChart.value = false;
    }, 500);
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss">
.custom-legend-item {
  display: flex;
  justify-content: space-between !important;
  margin-top: 5px;
  font-size: 14px;
  color: #000;
}

.apexcharts-legend {
  flex-direction: column !important;
  gap: 10px !important;
}

.apexcharts-legend-text {
  width: 100% !important;
}
</style>
