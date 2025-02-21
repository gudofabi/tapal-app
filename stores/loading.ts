export const useLoadingStore = defineStore("loadingStore", () => {
  const isLoading = ref(true);

  const startLoading = () => {
    isLoading.value = true;
  };
  const stoptLoading = () => {
    isLoading.value = false;
  };

  return { isLoading, startLoading, stoptLoading };
});
