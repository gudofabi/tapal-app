<template>
  <main class="h-svh bg-slate-100 dark:bg-gray-800 relative">
    <AppNavbar />
    <div class="container mx-auto py-10">
      <div class="h-full">
        <slot />
      </div>
    </div>
    <AppAlert />
  </main>
</template>

<script setup lang="ts"></script>
