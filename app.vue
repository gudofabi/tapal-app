<template>
  <CommonLoading />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();

onBeforeMount(() => {
  loadingStore.startLoading();
  setTimeout(() => {
    loadingStore.stoptLoading();
  }, 3000);
});
</script>
