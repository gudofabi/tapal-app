import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  /** Actions */
  const register = async ($params: any) => {
    const { refreshUser } = useSanctum();
    await useSanctumFetch("/api/register", {
      method: "post",
      body: $params,
    });
    await refreshUser();
    return navigateTo("/loans");
  };

  return {
    register,
  };
});
