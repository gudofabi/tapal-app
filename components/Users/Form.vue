<template>
  <USlideover v-model="data_show" prevent-close>
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Create User
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="func_closeForm"
          />
        </div>
      </template>
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

        <UFormGroup label="Role" name="role">
          <USelect v-model="data_form.role" :options="data_roleOptions" />
        </UFormGroup>

        <div class="text-right pt-6">
          <UButton
            type="submit"
            @click="func_submitForm"
            :loading="data_loading"
            >{{ data_loading ? "Loading..." : "Create" }}
          </UButton>
        </div>
      </UtilsFormValidation>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
import type { Form } from "~/types/users";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
const { $emitter } = useNuxtApp();

// Store
const authStore = useAuthStore();

const emits = defineEmits(["close"]);
const props = defineProps<{
  show: boolean;
  data: Form;
}>();

const data_show = ref(props.show);
const data_form = ref<Form>({
  name: "",
  email: "",
  contact_no: "",
  role: "",
});
const data_loading = ref(false);
const data_rules = computed(() => ({
  name: { required },
  email: { required, email },
  contact_no: {
    required,
    minLength: minLength(10), // Minimum of 10 digits
    maxLength: maxLength(10), // Maximum of 10 digits
  },
  role: { required },
}));

const data_roleOptions = ["Agent", "Lead Generator"];

watch(
  () => props.show,
  (value) => {
    data_show.value = value;
  }
);

watch(
  () => props.data,
  (value) => {
    data_form.value = { ...value };
  }
);

// REF
const formValidation = ref();

// ACTIONS
const func_submitForm = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }

  const newData = {
    ...data_form.value,
    role: data_form.value?.role?.toLowerCase(),
  };
  data_loading.value = true;
  authStore
    .createUser(newData)
    .then((res) => {
      func_closeForm();
      authStore.fetchUsers(1);
      $emitter.emit("alert-notification", {
        message: res?.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
    })
    .catch((err) => {
      emits("close", false);
      $emitter.emit("alert-notification", {
        message: err.response._data.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    })
    .finally(() => (data_loading.value = false));
};

const func_closeForm = () => {
  data_form.value = {};
  emits("close", false);
};
</script>
