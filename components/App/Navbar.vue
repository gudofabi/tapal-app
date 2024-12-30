<template>
  <div class="bg-white dark:bg-gray-900 shadow-md">
    <UContainer
      class="container mx-auto flex justify-between items-center py-3 w-full"
    >
      <div><router-link to="/">TAPAL-KING</router-link></div>
      <div class="flex items-center">
        <UHorizontalNavigation
          v-if="isLoggedIn"
          :links="privateLinks"
          :ui="{
            wrapper: 'w-auto',
            base: 'px-4',
          }"
        />
        <UHorizontalNavigation
          v-else
          :links="publicLinks"
          :ui="{
            base: 'px-4',
          }"
        />
        <UPopover v-if="isLoggedIn">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            :label="user ? user.name : 'Profile'"
          >
            <template #leading>
              <UAvatar
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                size="sm"
              />
            </template>
          </UButton>

          <template #panel="{ close }">
            <div class="p-2">
              <UVerticalNavigation :links="data_profileLinks" />
            </div>
          </template>
        </UPopover>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, user, logout } = useSanctum();

const func_logout = () => {
  logout();
};

const comp_profile = computed(() => {
  return user ? user.name : "Profile";
});

const data_profileLinks = [
  {
    label: "Settings",
    icon: "i-heroicons-outline:cog",
    to: "/settings",
  },
  {
    label: "Logout",
    icon: "i-heroicons-outline:logout",
    click: func_logout,
  },
];

const privateLinks = [
  {
    label: "Loans",
    icon: "i-heroicons-outline:clipboard-check",
    to: "/loans",
  },
  {
    label: "Reports",
    icon: "i-heroicons-chart-bar",
    to: "/report",
  },
  {
    label: "Users",
    icon: "i-heroicons-outline:users",
    to: "/users",
  },
];

const publicLinks = [
  {
    label: "Login",
    icon: "i-heroicons-outline:finger-print",
    to: "/login",
  },
  {
    label: "Register",
    icon: "i-heroicons-outline:lock-closed",
    to: "/register",
  },
];
</script>
