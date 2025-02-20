<template>
  <UContainer :ui="{ base: 'pt-10 pb-20' }">
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
      <!-- User DETAILS -->
      <!-- LOAN DETAILS -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
      >
        <!-- Grid Item 1 -->
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Profile ID</span
          >
          <p>{{ func_ifEmpty(getUserData?.profile_id) }}</p>
        </div>
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Name</span
          >
          <p>{{ func_ifEmpty(getUserData?.name) }}</p>
        </div>
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Email</span
          >
          <p>
            <a :href="`mailto:${getUserData?.email}`">
              {{ func_ifEmpty(getUserData?.email) }}
            </a>
          </p>
        </div>
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Contact Number</span
          >
          <p>
            <a :href="`tel:+63${getUserData?.contact_no}`">
              +63 {{ func_ifEmpty(getUserData?.contact_no) }}
            </a>
          </p>
        </div>
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Role</span
          >
          <p class="capitalize">{{ func_ifEmpty(getUserData?.role) }}</p>
        </div>
        <div class="mb-3">
          <span class="block uppercase text-xs font-semibold text-gray-400 pb-2"
            >Lend</span
          >
          <p class="capitalize">
            {{
              getUserData?.loans
                ? func_ifEmpty(getUserData?.loans.length)
                : "--"
            }}
          </p>
        </div>
      </div>
    </UCard>
    <div class="text-right my-5">
      <UButton to="/users" label="Back" color="gray" variant="solid" />
    </div>
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
