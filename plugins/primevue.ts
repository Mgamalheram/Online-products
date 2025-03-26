import PrimeVue from "primevue/config";
// Importing PrimeVue Components
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";
import Tooltip from "primevue/tooltip";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });

  // Register PrimeVue Components
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Paginator", Paginator);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.directive("tooltip", Tooltip);
});
