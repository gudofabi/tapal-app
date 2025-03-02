<template>
  <div class="h-svh w-full">
    <div class="h-full w-full">
      <!-- <UCard :ui="{ body: { base: 'grid grid-cols-3' } }"> -->
      <UCard class="w-[90%] md:w-[400px] mx-auto mt-20">
        <h3 class="text-2xl mb-2 font-bold font-dm-serif">Welcome Back!</h3>
        <p class="text-base text-gray-500">
          Enter your credentials to access your account.
        </p>
        <div class="space-y-4 mt-6">
          <UtilsFormValidation
            ref="formValidation"
            :rules="data_rules"
            :model="data_form"
          >
            <UFormGroup label="Email" name="email">
              <UInput v-model="data_form.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="data_form.password" type="password" />
            </UFormGroup>

            <p class="py-1 text-right hover:text-primary text-sm">
              <RouterLink to="/forgot-password"> Forgot Password? </RouterLink>
            </p>
            <UButton
              :loading="data_loading"
              type="submit"
              label="Login"
              color="gray"
              block
              @click="func_loginViaEmail"
            />
          </UtilsFormValidation>
        </div>

        <!-- <UDivider label="OR" orientation="vertical" />

      <div class="space-y-4 flex flex-col justify-center">
        <UButton
          color="black"
          label="Login with GitHub"
          icon="i-simple-icons-github"
          block
        />
        <UButton
          color="black"
          label="Login with Google"
          icon="i-simple-icons-google"
          block
        />
      </div> -->
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Login | Tapwal",
  ogTitle: "Login",
  description: "Tapwal login page, where you can access your account.",
  ogDescription: "Tapwal login page, where you can access your account.",
});

definePageMeta({
  middleware: ["$guest"],
});

import { required, email } from "@vuelidate/validators";

const { $emitter } = useNuxtApp();

const { login } = useSanctum();

// REF
const formValidation = ref();

const data_loading = ref(false);
const data_form = reactive({
  email: "",
  password: "",
});

const data_rules = computed(() => ({
  email: { required, email },
  password: {
    required,
  },
}));

const func_loginViaEmail = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }
  data_loading.value = true;
  await login(data_form)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: "Successfully Login!",
        alertType: "success",
        timeout: 3000,
        show: true,
      });
    })
    .catch((err) => {
      $emitter.emit("alert-notification", {
        message: err.response._data.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    })
    .finally(() => (data_loading.value = false));
};
</script>
