<template>
  <UContainer>
    <UBreadcrumb
      class="mb-8"
      :links="[
        { label: 'Home', to: '/' },
        { label: 'Users', to: '/users' },
        { label: `${$route.params?.profile_id}` },
      ]"
    />

    <UProgress animation="elastic" v-if="userLoading" class="py-5" />
    <UCard v-else>
      <template #header>
        <h4 class="block uppercase font-bold">User Details</h4>
      </template>
      <!-- LOAN DETAILS -->
      <template #footer>
        <div class="text-right">
          <UButton to="/users" label="Back" color="gray" variant="soft" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const $route = useRoute();

// Store
const authStore = useAuthStore();
const { userLoading, getUserData } = storeToRefs(authStore);

onMounted(() => {
  authStore.fetchUserData($route.params?.profile_id as string);
});

const func_ifEmpty = (value: any) => {
  return value ?? "--";
};
</script>
