<template>
  <main class="h-svh bg-white dark:bg-gray-800 relative">
    <AppNavbar />
    <div class="container mx-auto">
      <div class="h-full">
        <slot />
      </div>
    </div>
    <AppAlert />
  </main>
</template>

<script setup lang="ts"></script>
