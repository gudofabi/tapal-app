<template>
  <main class="h-full md:h-screen bg-white dark:bg-gray-800 relative">
    <AppNavbar />
    <div class="container mx-auto">
      <div class="h-full md:h-screen">
        <slot />
      </div>
    </div>
    <AppAlert />
  </main>
</template>

<script setup lang="ts"></script>
