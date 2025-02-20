<template>
  <AppNavbar />
  <div class="h-full md:h-screen bg-white dark:bg-gray-800 relative">
    <UContainer class="py-10">
      <UBreadcrumb
        class="mb-8"
        :links="[
          { label: 'Home', to: '/' },
          {
            label: 'Settings',
          },
        ]"
      />
      <UCard>
        <div class="flex flex-col md:flex-row md:min-h-[600px]">
          <UVerticalNavigation
            :links="links"
            :ui="{
              wrapper: 'mb-10',
              base: 'py-3',
              active: 'border-l-2 border-primary',
            }"
          />
          <UDivider orientation="vertical" class="mx-4" />
          <div class="w-full">
            <slot />
          </div>
        </div>
      </UCard>
    </UContainer>
    <AppAlert />
  </div>
</template>
<script setup lang="ts">
const links = [
  {
    label: "Personal Information",
    icon: "i-heroicons-outline:user-circle",
    to: "/settings/profile",
  },
  {
    label: "Change Password",
    icon: "i-heroicons-outline:key",
    to: "/settings/change-password",
  },
];
</script>
