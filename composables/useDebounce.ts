export default function useDebounce() {
  const debounce = (callback: any, delay = 300) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  return { debounce };
}
