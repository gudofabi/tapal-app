import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  // State
  const userList = ref([]);
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
      .catch((err) => {})
      .finally(() => (userLoading.value = false));
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

  const deleteUser = async ($id: number) => {
    return await useSanctumFetch(`/api/users/${$id}`, {
      method: "delete",
    });
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    register,
    fetchUsers,
    fetchUserData,
    setSearchQuery,
    createUser,
    deleteUser,
    getUsers,
    getUserData,
    userLoading,
    getPagination,
    getSearchQuery,
  };
});
