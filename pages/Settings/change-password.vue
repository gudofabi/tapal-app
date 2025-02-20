<template>
  <div class="w-full md:w-1/2">
    <h1>Change Password</h1>
    <UDivider class="my-4" />
    <UtilsFormValidation
      ref="formPasswordValidation"
      :rules="data_rules"
      :model="data_form"
    >
      <UFormGroup label="Old Password" name="old_password">
        <UInput v-model="data_form.current_password" type="password" />
      </UFormGroup>

      <UFormGroup label="New Password" name="password">
        <UInput v-model="data_form.password" type="password" />
      </UFormGroup>

      <UFormGroup label="Password Confirmation" name="password_confirmation">
        <UInput v-model="data_form.password_confirmation" type="password" />
      </UFormGroup>

      <div class="text-right pt-6">
        <UButton
          :loading="data_loading"
          label="Update Password"
          color="primary"
          type="submit"
          @click="func_update"
        />
      </div>
    </UtilsFormValidation>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "settings",
});
import { required, sameAs, minLength, helpers } from "@vuelidate/validators";
const { $emitter } = useNuxtApp();

const { refreshUser, logout } = useSanctum();
// Store
const authStore = useAuthStore();

const data_form = ref<any>({
  current_password: "",
  password: "",
  password_confirmation: "",
});
const data_loading = ref(false);

const hasUpperCase = helpers.regex(/(?=.*[A-Z])/);
const hasNumber = helpers.regex(/(?=.*\d)/);
const hasSpecialCharacter = helpers.regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/);

const data_rules = computed(() => ({
  current_password: { required },
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
    sameAsPassword: sameAs(data_form.value.password, "Passwords must match"),
  },
}));

// REF
const formPasswordValidation = ref();

const func_update = async () => {
  const isValid = await formPasswordValidation.value.validate();

  if (!isValid) {
    return;
  }

  data_loading.value = true;
  authStore
    .updatePassword(data_form.value)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: "Password successfully updated...",
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      logout();
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
