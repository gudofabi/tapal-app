<template>
  <div class="h-svh w-full">
    <div class="h-full w-full">
      <!-- <UCard :ui="{ body: { base: 'grid grid-cols-3' } }"> -->
      <UCard class="w-[90%] md:w-[400px] mx-auto mt-20">
        <div class="space-y-4">
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
