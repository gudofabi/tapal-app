import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  // State
  const userList = ref([]);
  const userListByRole = ref([]);
  const userData = ref({});
  const userLoading = ref(false);
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  const searchQuery = ref("");

  //   Getter
  const getUsers = computed(() => {
    return userList.value ?? [];
  });

  const getUsersByRole = computed(() => {
    return userListByRole.value ?? [];
  });

  const getUserData = computed(() => {
    return userData.value ?? {};
  });
  const getPagination = computed(() => pagination.value);
  const getSearchQuery = computed(() => searchQuery.value);

  /** Actions */
  const fetchUsers = async (page: number) => {
    userLoading.value = true;
    return await useSanctumFetch(
      `/api/users?page=${page}&search=${searchQuery.value}`
    )
      .then((response) => {
        const { data, meta } = response;
        userList.value = data;
        pagination.value = {
          currentPage: meta.current_page,
          lastPage: meta.last_page,
          perPage: meta.per_page,
          total: meta.total,
        };
      })
      .catch((err) => {})
      .finally(() => (userLoading.value = false));
  };

  const fetchUserData = async ($profile_id: string) => {
    userLoading.value = true;
    return await useSanctumFetch(`/api/users/${$profile_id}`)
      .then((response) => {
        const { data } = response;
        userData.value = data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (userLoading.value = false));
  };

  const fetchUserByRole = async ($role: string) => {
    return await useSanctumFetch(`/api/users/role/${$role}`);
  };

  const register = async ($params: any) => {
    const { refreshUser } = useSanctum();
    await useSanctumFetch("/api/register", {
      method: "post",
      body: $params,
    });
    await refreshUser();
    return navigateTo("/login");
  };

  const createUser = async ($params: any) => {
    return await useSanctumFetch("/api/users", {
      method: "post",
      body: $params,
    });
  };

  const updateProfile = async ($params: any) => {
    return await useSanctumFetch(`/api/user/profile-information`, {
      method: "put",
      body: $params,
    });
  };

  const updatePassword = async ($params: any) => {
    return await useSanctumFetch(`/api/user/password`, {
      method: "put",
      body: $params,
    });
  };

  const deleteUser = async ($id: number) => {
    return await useSanctumFetch(`/api/users/${$id}`, {
      method: "delete",
    });
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const forgotPassword = async ($params: any) => {
    return await useSanctumFetch(`/api/forgot-password`, {
      method: "post",
      body: $params,
    });
  };

  const resetPassword = async ($params: any) => {
    return await useSanctumFetch(`/api/reset-password`, {
      method: "post",
      body: $params,
    });
  };

  return {
    register,
    fetchUsers,
    fetchUserByRole,
    fetchUserData,
    setSearchQuery,
    createUser,
    updateProfile,
    updatePassword,
    deleteUser,
    forgotPassword,
    resetPassword,
    getUsers,
    getUsersByRole,
    getUserData,
    userLoading,
    getPagination,
    getSearchQuery,
  };
});
