export const useLoadingStore = defineStore("loadingStore", () => {
  const isLoading = ref(true);

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  const preloadImages = (): Promise<void> => {
    const images = Array.from(document.querySelectorAll("img")); // Get all images in the DOM
    const promises = images.map((img) => {
      if ((img as HTMLImageElement).complete) return Promise.resolve(); // If already loaded, resolve immediately
      return new Promise<void>((resolve) => {
        (img as HTMLImageElement).onload = () => resolve();
        (img as HTMLImageElement).onerror = () => resolve(); // Resolve even if there's an error
      });
    });

    return Promise.all(promises).then(() => {});
  };

  return { isLoading, startLoading, stopLoading, preloadImages };
});
