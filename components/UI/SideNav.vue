<template>
  <div class="mt-5">
    <h2 class="text-2xl italic font-bold block sm:hidden ps-6 pb-3 border-b">
      {{ $t("TITLES.kabret") }}
    </h2>

    <div v-for="item in sidebar" :key="item.title">
      <template v-if="item.type == 'link'">
        <NuxtLink :to="localePath(item.to)" class="link">
          <SvgIcon :name="item.icon" class="dark:stroke-white" />
          {{ $t(`NAV.${item.title}`) }}
        </NuxtLink>
      </template>

      <template v-if="item.type == 'menu'">
        <button
          @click="activeMenuToggle(item.title)"
          class="link relative w-full"
          :class="activeMenu == item.title && 'active-menu'"
        >
          <SvgIcon :name="item.icon" class="dark:stroke-white" />
          {{ $t(`NAV.${item.title}`) }}

          <span
            class="absolute end-5 transition-all text-gray-400"
            :class="activeMenu == item.title && 'rotate-180'"
          >
            <i class="far fa-angle-up" />
          </span>
        </button>

        <div
          class="flex flex-col overflow-hidden transition-all relative"
          :style="{
            height:
              activeMenu == item.title ? 40 * item.children.length + 'px' : '0',
          }"
        >
          <NuxtLink
            v-for="(subitem, k) in item.children"
            :to="localePath(subitem.to)"
            :key="k"
            class="menu-link"
          >
            {{ $t(`NAV.${subitem.title}`) }}
          </NuxtLink>

          <span
            class="absolute start-8 w-[2px] bg-blue-400"
            :style="{
              height:
                activeMenu == item.title
                  ? 36 * item.children.length + 'px'
                  : '0',
            }"
          ></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const sidebar = [
  {
    title: "dashboard",
    type: "link",
    icon: "rocket",
    to: "/",
  },
  {
    title: "categories",
    type: "menu",
    icon: "categories",
    children: [
      {
        title: "all_categories",
        type: "link",
        to: "/categories",
      },
      // {
      //   title: "add_category",
      //   type: "link",
      //   to: "/categories/form",
      // },
    ],
  },
  {
    title: "products",
    type: "menu",
    icon: "bag",
    children: [
      {
        title: "all_products",
        type: "link",
        to: "/products",
      },
      {
        title: "add_product",
        type: "link",
        to: "/products/form",
      },
    ],
  },
  {
    title: "users",
    type: "menu",
    icon: "users",
    children: [
      {
        title: "all_users",
        type: "link",
        to: "/users",
      },
      {
        title: "add_user",
        type: "link",
        to: "/users/form",
      },
    ],
  },
];

const activeMenu = ref(null);
const activeMenuToggle = (title) => {
  if (activeMenu.value == title) {
    activeMenu.value = null;
  } else {
    activeMenu.value = title;
  }
};

sidebar.forEach((el) => {
  if (el.type == "menu") {
    el.children.forEach((subitem) => {
      if (subitem.to == route.path) {
        activeMenu.value = el.title;
      }
    });
  } else {
    if (el.to == route.path) {
      activeMenu.value = el.title;
    }
  }
});

watch(
  () => route.path,
  () => {
    sidebar.forEach((el) => {
      if (el.type == "menu") {
        el.children.forEach((subitem) => {
          if (subitem.to == route.path) {
            activeMenu.value = el.title;
          }
        });
      } else {
        if (el.to == route.path) {
          activeMenu.value = el.title;
        }
      }
    });
  }
);
</script>

<style lang="scss" scoped>
.link {
  @apply flex items-center gap-2 py-2 px-5 text-gray-500 dark:text-gray-400;
  &.router-link-active.router-link-exact-active {
    @apply text-blue-500 font-medium;
    svg {
      @apply stroke-blue-500 stroke-[1.5];
    }
  }

  &.active-menu {
    @apply text-blue-500 font-medium;

    svg {
      @apply stroke-blue-500 stroke-[1.5];
    }
  }
}

.menu-link {
  @apply mb-2 last:mb-0 ms-12 me-5 ps-5 py-1 rounded-md text-gray-500 dark:text-gray-400;
  &.router-link-active.router-link-exact-active {
    @apply text-blue-500 dark:bg-blue-500 bg-blue-100 dark:text-white font-medium;
  }
}
</style>
