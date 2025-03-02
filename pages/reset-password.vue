<template>
  <div class="h-svh w-full">
    <div class="h-full w-full">
      <UCard class="w-[90%] md:w-[400px] mx-auto mt-20">
        <template v-if="!data_doneTransaction">
          <h3 class="text-2xl mb-2 font-bold font-dm-serif">
            Set Your New Password
          </h3>
          <p class="text-base text-gray-500">
            Choose a strong password to keep your account secure.
          </p>
          <div class="space-y-4 mt-6">
            <UtilsFormValidation
              ref="formValidation"
              :rules="data_rules"
              :model="data_form"
            >
              <UFormGroup label="Password" name="password">
                <UInput v-model="data_form.password" type="password" />
              </UFormGroup>

              <UFormGroup
                label="Password Confirmation"
                name="password_confirmation"
              >
                <UInput
                  v-model="data_form.password_confirmation"
                  type="password"
                />
              </UFormGroup>

              <UButton
                :loading="data_loading"
                type="submit"
                label="Reset Password"
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
              name="i-heroicons-solid:thumb-up"
              class="text-5xl mb-2 text-primary"
            />
            Password Reset Successful
          </h3>
          <p class="text-base text-center text-gray-500 pb-6">
            Your new password has been set. You can now log in with your updated
            credentials. Go to
            <RouterLink to="/login" class="text-primary font-medium"
              >Login</RouterLink
            >
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Reset Password | Tapwal",
  ogTitle: "Reset Password",
  description:
    "Tapwal reset password page, where you can reset your account password.",
  ogDescription:
    "Tapwal reset password page, where you can reset your account password.",
});

definePageMeta({
  middleware: ["$guest"],
});

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

const { $emitter } = useNuxtApp();
const route = useRoute();

// Store
const authStore = useAuthStore();

const formValidation = ref();

const data_loading = ref(false);
const data_doneTransaction = ref(false);
const data_form = reactive({
  token: route.query.token,
  email: route.query.email,
  password: "",
  password_confirmation: "",
});

const hasUpperCase = helpers.regex(/(?=.*[A-Z])/);
const hasNumber = helpers.regex(/(?=.*\d)/);
const hasSpecialCharacter = helpers.regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/);

const data_rules = computed(() => ({
  token: { required },
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
    hasUppercase: helpers.withMessage(
      "At least have a uppercase",
      hasUpperCase
    ),
    hasNumber: helpers.withMessage("At least have a number", hasNumber),
    hasSpecialCharacter: helpers.withMessage(
      "At least have a special character",
      hasSpecialCharacter
    ),
  },
  password_confirmation: {
    required,
    sameAsPassword: sameAs(data_form.password, "Password must match"),
  },
}));

const func_handleSubmit = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }

  data_loading.value = true;
  data_doneTransaction.value = false;
  authStore
    .resetPassword(data_form)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: "Password successfully reset...",
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
