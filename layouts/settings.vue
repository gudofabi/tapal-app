<template>
  <AppNavbar />
  <div class="h-svh bg-slate-100 dark:bg-gray-800 relative">
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
        <div class="flex min-h-[600px]">
          <UVerticalNavigation
            :links="links"
            :ui="{
              base: 'py-3',
            }"
          />
          <UDivider orientation="vertical" class="mx-4" />
          <div class="w-full">
            <slot />
          </div>
        </div>
      </UCard>
    </UContainer>
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
