<template>
  <div class="h-dvh w-full">
    <div class="h-full w-full">
      <!-- <UCard :ui="{ body: { base: 'grid grid-cols-3' } }"> -->
      <UCard class="w-[90%] md:w-[400px] mx-auto mt-20">
        <div class="space-y-4">
          <UtilsFormValidation
            ref="formValidation"
            :rules="data_rules"
            :model="data_form"
          >
            <UFormGroup label="Name" name="name">
              <UInput v-model="data_form.name" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
              <UInput v-model="data_form.email" type="email" />
            </UFormGroup>

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
              label="Register"
              color="gray"
              block
              @click="func_register"
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
  title: "Register | Tapwal",
  ogTitle: "Register",
  description: "Tapwal registration page, where you can create an account.",
  ogDescription: "Tapwal registration page, where you can create an account.",
});

import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

definePageMeta({
  middleware: ["$guest"],
});

const { $emitter } = useNuxtApp();

const authStore = useAuthStore();

const data_form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const data_loading = ref(false);

const hasUpperCase = helpers.regex(/(?=.*[A-Z])/);
const hasNumber = helpers.regex(/(?=.*\d)/);
const hasSpecialCharacter = helpers.regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/);

const data_rules = computed(() => ({
  name: { required },
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

// REF
const formValidation = ref();

const func_register = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }
  data_loading.value = true;
  authStore
    .register(data_form)
    .then((res: any) => {
      $emitter.emit("alert-notification", {
        message: "Verify your email first...",
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
