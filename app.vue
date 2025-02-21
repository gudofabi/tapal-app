<template>
  <CommonLoading />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();

onBeforeMount(async () => {
  loadingStore.startLoading();

  await loadingStore.preloadImages();

  setTimeout(() => {
    loadingStore.stopLoading();
  }, 500);
});
</script>
