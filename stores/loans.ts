export const useLoanStore = defineStore("loanStore", () => {
  //   State
  const loanList = ref([]);
  const loanLoading = ref(false);
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  const searchQuery = ref("");

  //   Getter
  const getLoans = computed(() => {
    return loanList.value ?? [];
  });
  const getPagination = computed(() => pagination.value);
  const getSearchQuery = computed(() => searchQuery.value);

  //   Actions
  const fetchLoans = async (page: number) => {
    loanLoading.value = true;
    return await useSanctumFetch(
      `/api/loans?page=${page}&search=${searchQuery.value}`
    )
      .then((response) => {
        const { data, meta } = response;
        loanList.value = data;
        pagination.value = {
          currentPage: meta.current_page,
          lastPage: meta.last_page,
          perPage: meta.per_page,
          total: meta.total,
        };
      })
      .catch((err) => {})
      .finally(() => (loanLoading.value = false));
  };

  const createLoan = async ($params: any) => {
    return await useSanctumFetch("/api/loans", {
      method: "post",
      body: $params,
    });
  };

  const updateLoan = async ($id: number, $params: any) => {
    return await useSanctumFetch(`/api/loans/${$id}`, {
      method: "patch",
      body: $params,
    });
  };

  const deleteLoan = async ($id: number) => {
    return await useSanctumFetch(`/api/loans/${$id}`, {
      method: "delete",
    });
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    fetchLoans,
    createLoan,
    updateLoan,
    deleteLoan,
    setSearchQuery,
    getLoans,
    loanLoading,
    getPagination,
    getSearchQuery,
  };
});
