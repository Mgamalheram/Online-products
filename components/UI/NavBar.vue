<template>
  <div class="py-2 bg-white dark:bg-box-dark custom-shadow-bottom">
    <div class="flex items-center justify-between">
      <div class="px-4 w-[250px] flex items-center justify-between">
        <h2 class="text-2xl italic font-bold sm:block hidden">
          {{ $t("TITLES.kabret") }}
        </h2>

        <button
          class="text-xl text-blue-600"
          type="button"
          @click="$emit('resizeSidebar')"
        >
          <i class="fal fa-bars" />
        </button>
      </div>

      <div class="px-4 flex items-center justify-center gap-4">
        <button
          @click="handleSwitchMode()"
          class="flex size-10 items-center justify-center rounded-full bg-screen bg-red-700 bg-opacity-20"
        >
          <SvgIcon name="moon" class="stroke-red-700" />
        </button>

        <button
          class="flex size-10 items-center justify-center rounded-full bg-screen bg-primary bg-opacity-20"
        >
          <SvgIcon name="bell" class="stroke-primary" />
        </button>

        <div class="relative">
          <button
            @click="
              $event.stopPropagation();
              showProfileMenu = !showProfileMenu;
            "
            class="size-[50px] flex items-center justify-center overflow-hidden"
          >
            <span class="flex items-center justify-center">
              <img
                src="/avatar.png"
                alt="Mohamed Elsayed"
                class="rounded-full w-full h-full"
              />
            </span>
          </button>

          <transition name="fade">
            <div
              v-if="showProfileMenu"
              class="absolute top-[120%] -translate-x-1/2 w-[250px] overflow-hidden bg-white dark:bg-box-dark rounded-xl shadow border border-primary border-opacity-5"
              :class="locale == 'en' ? '-start-1/2' : 'end-[100%]'"
            >
              <NuxtLink
                :to="localePath('/profile')"
                class="flex items-center gap-2 border-b dark:border-gray-500 p-4 font-medium hover:bg-primary hover:bg-opacity-5 hover:text-primary transition-all"
              >
                <img
                  src="/avatar.png"
                  alt="Mohamed Elsayed"
                  class="rounded-full size-10"
                />
                <span>{{ $t("TITLES.view_profile") }}</span>
              </NuxtLink>

              <button
                @click="showModalLogout = true"
                type="button"
                class="flex items-center gap-2 p-4 font-medium hover:bg-primary hover:bg-opacity-5 hover:text-primary w-full transition-all"
              >
                <span
                  class="flex items-center justify-center size-10 rounded-full border dark:border-gray-500 bg-red-700 bg-opacity-20"
                >
                  <SvgIcon name="logout" />
                </span>
                <span>{{ $t("LABELS.logout") }}</span>
              </button>
            </div>
          </transition>
        </div>

        <div class="relative">
          <button
            @click="
              langMenu = !langMenu;
              $event.stopPropagation();
            "
            class="flex items-center justify-center gap-2 transition-all"
          >
            <div class="!size-8">
              <img
                class="object-fill"
                :src="locale == 'en' ? '/usa.png' : '/saudi-arabia.png'"
                alt="flag"
              />
            </div>

            <span class="uppercase">
              {{ locale }}
            </span>
          </button>

          <transition name="fade">
            <div
              v-if="langMenu"
              class="absolute end-0 z-10 flex w-[150px] flex-col items-center justify-center rounded-lg bg-white dark:bg-box-dark !p-2"
            >
              <NuxtLink
                v-for="(lang, i) in locales"
                :key="i"
                class="mb-2 w-full rounded-lg p-2 font-semibold last:mb-0 text-center border-b hover:bg-primary hover:bg-opacity-30 transition-all"
                :class="locale == lang.code && 'bg-primary text-white'"
                :to="switchLocalePath(locale == 'en' ? 'ar' : 'en')"
              >
                {{ lang.code == "en" ? "English" : "عربي" }}
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showModalLogout"
      modal
      class="md:w-[30rem] w-[96%]"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-xl pt-1">{{ $t("LABELS.logout") }}</span>
        </div>
      </template>

      <p class="font-medium mb-5">
        {{ $t("TITLES.sureAboutLogout") }}
      </p>

      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="showModalLogout = false"
          class="base-btn-white"
        >
          {{ $t("LABELS.cancel") }}
        </button>

        <button type="button" @click="logoutFunc" class="base-btn">
          {{ $t("LABELS.confirm") }}
        </button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Dialog from "primevue/dialog";
import { useStore } from "~/store";

const store = useStore();
const colorMode = useColorMode();
function handleSwitchMode() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}

const { locales, locale } = useI18n();
const langMenu = ref(false);

const showProfileMenu = ref(false);

const showModalLogout = ref(false);

const logoutFunc = () => {
  useCookie("kabret_task_token").value = null;
  store.setToken(null);
  window.location.reload();
};

onMounted(() => {
  window.addEventListener("click", () => {
    langMenu.value = false;
    showProfileMenu.value = false;
  });
});
</script>

<style lang="scss" scoped>
.custom-shadow-bottom {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
