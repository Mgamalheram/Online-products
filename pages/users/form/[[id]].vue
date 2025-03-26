<template>
  <div class="container">
    <SharedBreadcrumbs :items="items" />

    <div class="box-base">
      <h2 class="text-2xl font-semibold mb-2">
        {{ $route.params.id ? t("LABELS.edit_user") : t("LABELS.add_user") }}
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
            <InputsBaseTextInput
              name="firstname"
              type="text"
              :label="$t('LABELS.firstname')"
              :placeholder="$t('INPUTS.firstname')"
            />

            <InputsBaseTextInput
              name="lastname"
              type="text"
              :label="$t('LABELS.lastname')"
              :placeholder="$t('INPUTS.lastname')"
            />

            <InputsBaseTextInput
              name="email"
              type="text"
              :label="$t('LABELS.email')"
              :placeholder="$t('INPUTS.email')"
            />

            <InputsBaseTextInput
              name="phone"
              type="text"
              :label="$t('LABELS.phone')"
              :placeholder="$t('INPUTS.phone')"
            />

            <InputsBaseTextInput
              name="username"
              type="text"
              :label="$t('LABELS.username')"
              :placeholder="$t('INPUTS.username')"
            />

            <InputsBaseTextInput
              name="password"
              type="password"
              :label="$t('LABELS.password')"
              :placeholder="$t('INPUTS.password')"
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
    label: t("NAV.users"),
    url: "/users",
    // disabled: true,
  },
  {
    label: route.params.id ? t("LABELS.edit_user") : t("LABELS.add_user"),
    url: "",
    // disabled: true,
  },
]);

const loading = ref(true);
const loadingBtn = ref(false);

const initialValues = ref({});

const schema = ref(
  yup.object().shape({
    firstname: yup.string().required(t("ERRORS.firstname")),
    lastname: yup.string().required(t("ERRORS.lastname")),
    email: yup.string().required(t("ERRORS.email")),
    phone: yup.string().required(t("ERRORS.phone")),
    username: yup.string().required(t("ERRORS.username")),
    password: yup.string().required(t("ERRORS.password")),
  })
);

const submit = async (values) => {
  loadingBtn.value = true;

  let url;
  if (!route.params.id) {
    url = "users";
  } else {
    url = `users/${route.params.id}`;
  }

  try {
    await $fetch(url, {
      method: !route.params.id ? "POST" : "PUT",
      baseURL,
      body: {
        email: values.email,
        username: values.username,
        password: values.password,
        name: {
          firstname: values.firstname,
          lastname: values.lastname,
        },
        address: {
          city: "kilcoole",
          street: "7835 new road",
          number: 3,
          zipcode: "12926-3874",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: values.phone,
      },
    });

    toast.success(t("TITLES.user_saved"));
    setTimeout(() => {
      router.push(localePath("/users"));
    }, 1500);
  } catch (err) {
    toast.error(err.message);
  }
};

const getData = async () => {
  try {
    const data = await $fetch(`users/${route.params.id}`, {
      method: "GET",
      baseURL,
    });
    initialValues.value = {
      email: data.email,
      username: data.username,
      password: data.password,
      firstname: data.name.firstname,
      lastname: data.name.lastname,
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: data.phone,
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
