<template>
  <div>
    <div class="sticky top-0 z-[1001]">
      <UINavBar @resizeSidebar="changeVisibility" />
    </div>

    <div class="flex">
      <div
        class="w-[250px] bg-white dark:bg-box-dark h-[calc(100vh-66px)] fixed z-[1000] custom-shadow-end transition-all"
        :class="!isSideBraVisible ? '-ms-[250px]' : ''"
      >
        <UISideNav />
      </div>

      <div
        class="my-2 transition-all"
        :class="
          isSideBraVisible
            ? 'xl:w-[calc(100%-250px)] w-full xl:ms-[250px]'
            : 'w-full ms-0'
        "
      >
        <div class="container">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const isSideBraVisible = ref(true);
const changeVisibility = () => {
  isSideBraVisible.value = !isSideBraVisible.value;
  useCookie("isVisibleSideBar").value = isSideBraVisible.value;
};

const isSmallScreen = ref(false);

function getScreenWidth() {
  if (window.innerWidth < 1200) {
    isSmallScreen.value = true;
    isSideBraVisible.value = false;
  } else {
    isSmallScreen.value = false;
    isSideBraVisible.value = true;
  }
}

watch(
  () => route.path,
  () => {
    if (isSmallScreen.value) {
      isSideBraVisible.value = false;
    }
  },
  { deep: true }
);

onMounted(() => {
  getScreenWidth();
  window.addEventListener("resize", getScreenWidth);
});
</script>

<style lang="scss" scoped>
.custom-shadow-end {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}
</style>
