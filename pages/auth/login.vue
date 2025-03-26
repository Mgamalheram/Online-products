<template>
  <div>
    <h2 class="mb-4 text-5xl font-bold italic text-center">Kabret</h2>

    <h3 class="text-[32px] font-bold mb-4">{{ $t("TITLES.login") }}</h3>

    <div>
      <veeForm
        as="div"
        @submit="submit"
        :validation-schema="schema"
        :initialValues="initialValues"
      >
        <form>
          <div class="mb-6">
            <InputsBaseTextInput
              name="username"
              :label="$t('LABELS.username')"
              :placeholder="$t('INPUTS.username')"
              type="text"
            />
          </div>

          <div class="mb-6">
            <InputsBaseTextInput
              name="password"
              :label="$t('LABELS.password')"
              :placeholder="$t('INPUTS.password')"
              type="password"
            />
          </div>

          <div>
            <button type="submit" class="base-btn">
              {{ $t("TITLES.login") }}
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
import { useStore } from "~/store";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

definePageMeta({
  layout: "auth",
});

const { t, locale } = useI18n();

const localePath = useLocalePath();

const router = useRouter();

const store = useStore();

const {
  public: { baseURL },
} = useRuntimeConfig();


const schema = yup.object().shape({
  username: yup.string().required(t("ERRORS.username")),
  password: yup
    .string()
    .min(6, t("ERRORS.passwordMin"))
    .required(t("ERRORS.password")),
});

const initialValues = ref({
  username: "mor_2314",
  password: "83r5^_",
});

const submit = async (values) => {
  try {
    const data = await $fetch("/auth/login", {
      method: "POST",
      baseURL,
      body: {
        username: values.username,
        password: values.password,
      },
      // headers: headers.value,
    });

    useCookie("kabret_task_token").value = data.token;
    store.setToken(data.token);
    router.push(localePath("/"));

    toast.success(t("TEXTS.login_success"));
  } catch (err) {
    toast.error(err.response?._data);
  }
};
</script>

<style lang="scss" scoped></style>
