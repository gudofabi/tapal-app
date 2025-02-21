<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="z-50 flex justify-center items-center flex-col bg-white h-full w-full left-0 top-0 fixed"
    >
      <div
        class="loading-spinner border-4 border-gray-100 rounded-full w-12 h-12 border-t-primary"
      ></div>
      <p class="mt-3 text-3xl text-[#333]">Loading...</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
