<template>
  <div class="w-[900px] mx-auto flex flex-col">
    <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
      <div class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="data_form.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="data_form.password" type="password" />
        </UFormGroup>

        <UButton label="Login" color="gray" block @click="func_loginViaEmail" />
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
definePageMeta({
  middleware: ["$guest"],
});
const { login } = useSanctum();
const data_form = reactive({
  email: "",
  password: "",
});

const func_loginViaEmail = async () => {
  await login(data_form);
};
</script>
