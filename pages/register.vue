<template>
  <div class="w-[900px] mx-auto flex flex-col">
    <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
      <div class="space-y-4">
        <UFormGroup label="Name" name="name">
          <UInput v-model="data_form.name" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="data_form.email" type="email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="data_form.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Password Confirmation" name="password_confirmation">
          <UInput v-model="data_form.password_confirmation" type="password" />
        </UFormGroup>

        <UButton label="Register" color="gray" block @click="func_register" />
      </div>

      <UDivider label="OR" orientation="vertical" />

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
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();

const data_form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const func_register = async () => {
  authStore.register(data_form);
};
</script>
