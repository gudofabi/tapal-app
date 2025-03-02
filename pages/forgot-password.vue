<template>
  <div class="h-svh w-full">
    <div class="h-full w-full">
      <UCard class="w-[90%] md:w-[400px] mx-auto mt-20">
        <template v-if="!data_doneTransaction">
          <div>
            <h3 class="text-2xl mb-2 font-bold font-dm-serif">
              Forgot Password?
            </h3>
            <p class="text-base text-gray-500">
              No worries, well send you reset instructions.
            </p>
          </div>
          <div class="space-y-4 mt-6">
            <UtilsFormValidation
              ref="formValidation"
              :rules="data_rules"
              :model="data_form"
            >
              <UFormGroup label="Email" name="email">
                <UInput
                  v-model="data_form.email"
                  placeholder="Please enter your email"
                />
              </UFormGroup>

              <UButton
                :loading="data_loading"
                type="submit"
                label="Submit"
                color="gray"
                block
                @click="func_handleSubmit"
              />
            </UtilsFormValidation>
          </div>
        </template>
        <div v-else>
          <h3
            class="text-2xl mb-4 font-bold font-dm-serif flex items-center flex-col"
          >
            <UIcon
              name="i-heroicons-solid:check-circle"
              class="text-5xl mb-2 text-primary"
            />
            Password Reset Link Sent
          </h3>
          <p class="text-base text-center text-gray-500 pb-6">
            We've sent you a password reset link. Check your email and follow
            the instructions to reset your password.
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Forgot Password | Tapwal",
  ogTitle: "Forgot Password",
  description:
    "Tapwal forgot password page, where you can reset your account password.",
  ogDescription:
    "Tapwal forgot password page, where you can reset your account password.",
});

definePageMeta({
  middleware: ["$guest"],
});

import { required, email } from "@vuelidate/validators";

const { $emitter } = useNuxtApp();

// Store
const authStore = useAuthStore();

const formValidation = ref();

const data_loading = ref(false);
const data_doneTransaction = ref(false);
const data_form = reactive({
  email: "",
});

const data_rules = computed(() => ({
  email: { required, email },
}));

const func_handleSubmit = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }

  data_loading.value = true;
  data_doneTransaction.value = false;
  authStore
    .forgotPassword(data_form)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: "Password Reset Link Sent...",
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      data_doneTransaction.value = true;
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
