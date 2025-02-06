<template>
  <div class="w-1/2">
    <h1>Profile Information</h1>
    <UDivider class="my-4" />
    <UtilsFormValidation
      ref="formValidation"
      :rules="data_rules"
      :model="data_form"
    >
      <UFormGroup label="Name" name="name">
        <UInput v-model="data_form.name"></UInput>
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="data_form.email"></UInput>
      </UFormGroup>

      <UFormGroup label="Contact Number" name="contact_no">
        <UInput v-model="data_form.contact_no">
          <template #leading>
            <span class="text-gray-500 dark:text-gray-400 text-xs">+63</span>
          </template>
        </UInput>
      </UFormGroup>

      <div class="mb-3">
        <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
          >Role</span
        >
        <p class="capitalize">{{ func_ifEmpty(user?.role) }}</p>
      </div>

      <div class="text-right pt-6">
        <UButton type="submit" @click="func_submitForm" :loading="data_loading">
          Update Profile
        </UButton>
      </div>
    </UtilsFormValidation>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "settings",
});

import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
const { $emitter } = useNuxtApp();

const { user, refreshUser } = useSanctum();
// Store
const authStore = useAuthStore();

const data_form = ref<any>({
  name: "",
  email: "",
  contact_no: "",
});

const data_rules = computed(() => ({
  name: { required },
  email: { required, email },
  contact_no: {
    required,
    numeric,
    minLength: minLength(10), // Minimum of 10 digits
    maxLength: maxLength(10), // Maximum of 10 digits
  },
}));

const data_loading = ref(false);

// REF
const formValidation = ref();

onMounted(async () => {
  data_form.value = {
    name: user.value?.name ?? "",
    email: user.value?.email ?? "",
    contact_no: user.value?.contact_no ?? "",
  };
});

const func_ifEmpty = (value: any) => {
  return value ?? "--";
};

const func_submitForm = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }

  const newData = {
    ...data_form.value,
    role: user.value?.role?.toLowerCase(),
  };
  data_loading.value = true;
  authStore
    .updateProfile(newData)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: "Details successfully updated...",
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      refreshUser();
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
