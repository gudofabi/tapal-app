<template>
  <UContainer>
    <UBreadcrumb
      class="mb-8"
      :links="[{ label: 'Home', to: '/' }, { label: 'Loans' }]"
    />

    <UCard>
      <template #header>
        <div class="flex w-full justify-between">
          <div class="flex gap-x-2">
            <UInput
              v-model="data_searchQuery"
              placeholder="Search..."
              icon="i-heroicons-magnifying-glass-20-solid"
              @input="func_search"
            />
            <UButton
              v-if="data_searchQuery"
              icon="i-heroicons-outline:x"
              size="sm"
              color="primary"
              variant="ghost"
              @click="func_clearSearch"
            />
          </div>
          <UButton
            icon="heroicons-outline:plus-sm"
            size="sm"
            color="primary"
            variant="solid"
            label="Add Loan"
            trailing
            @click="func_showCreateForm"
          />
        </div>
      </template>

      <UTable
        :rows="getLoans"
        :columns="columns"
        class="w-full"
        :loading="loanLoading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
      >
        <template #amount-data="{ row }">
          PHP {{ formatMoney(row.amount) }}
        </template>
        <template #interest_amount-data="{ row }">
          PHP {{ formatMoney(row.interest_amount) }}
        </template>
        <template #status-data="{ row }">
          <UBadge
            size="xs"
            :color="row.status === 'Pending' ? 'blue' : 'primary'"
            :label="row.status"
            variant="subtle"
          />
        </template>
        <template #action-data="{ row }">
          <UPopover>
            <UButton
              color="white"
              variant="ghost"
              trailing-icon="i-heroicons-outline:dots-horizontal"
            >
            </UButton>

            <template #panel="{ close }">
              <div class="p-2">
                <UButton
                  v-if="row.status == 'Pending'"
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  class="text-green-400 hover:text-green-500"
                  color="white"
                  variant="ghost"
                  label="Completed"
                  icon="i-heroicons-outline:check"
                  @click="func_showEditForm(row)"
                />
                <UDivider v-if="row.status == 'Pending'" />
                <UButton
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  color="white"
                  variant="ghost"
                  label="View"
                  icon="i-heroicons-outline:eye"
                  :to="`/loans/${row.transaction_no}`"
                />
                <UButton
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  class="text-blue-400 hover:text-blue-500"
                  color="white"
                  variant="ghost"
                  label="Edit"
                  icon="i-heroicons-outline:pencil"
                  @click="func_showEditForm(row)"
                />
                <UButton
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  class="text-red-400 hover:text-red-500"
                  color="white"
                  variant="ghost"
                  label="Delete"
                  icon="i-heroicons-outline:trash"
                  @click="func_showDeleteModal(row)"
                />
              </div>
            </template>
          </UPopover>
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-800"
      >
        <UPagination
          v-model="data_currentPage"
          :page-count="data_pagination.perPage"
          :total="data_pagination.total"
          @update:modelValue="func_pageChange"
        />
      </div>
    </UCard>

    <LoanForm
      :show="data_isOpenSlider"
      :is-edit="data_isEdit"
      :data="data_form"
      @close="
      (value: boolean) => {
        data_isOpenSlider = value;
      }
    "
    />

    <UModal v-model="data_showDeleteModal" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Warning
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="data_showDeleteModal = false"
            />
          </div>
        </template>
        <p>
          Are you sure you want to delete this loan? This action is irreversible
          and cannot be undone.
        </p>
        <template #footer>
          <div class="text-right">
            <UButton
              variant="ghost"
              color="white"
              label="Cancel"
              @click="data_showDeleteModal = false"
            />
            <UButton
              variant="solid"
              color="primary"
              label="Confirm"
              @click="func_confirmDelete"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import type { Form } from "~/types/loan";
const { debounce } = useDebounce();
const { $emitter } = useNuxtApp();

definePageMeta({
  middleware: ["$auth"],
});

// Store
const loanStore = useLoanStore();
const { getLoans, loanLoading, getPagination, getSearchQuery } =
  storeToRefs(loanStore);

// DATA
const data_selectedLoan = ref<any>(null);
const data_isOpenSlider = ref(false);
const data_showDeleteModal = ref(false);
const data_isEdit = ref(false);
const columns = [
  {
    key: "transaction_no",
    label: "Transaction #",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "loan_percentage",
    label: "Percentage",
  },
  {
    key: "interest_amount",
    label: "Interest Amount",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "action",
    label: "Action",
  },
];
const data_currentPage = ref(1);
const data_searchQuery = ref(getSearchQuery.value);
const data_pagination = computed(() => getPagination.value);

const data_form = ref<Form>({
  amount: 0,
  loan_percentage: 0,
  date: new Date(),
  status: "",
  agent_id: "",
  agent_percentage: 0,
  lead_generator_id: "",
  lead_generator_percentage: 0,
});

onMounted(() => {
  loanStore.fetchLoans(data_currentPage.value);
});

// ACTION
const func_pageChange = (page: number) => {
  data_currentPage.value = page;
  loanStore.fetchLoans(page);
};

const func_search = debounce(() => {
  loanStore.setSearchQuery(data_searchQuery.value);
  loanStore.fetchLoans(1);
}, 1000);

const func_showEditForm = (data: any) => {
  data_isOpenSlider.value = !data_isOpenSlider.value;
  data_isEdit.value = true;
  // Edit value
  data_form.value = {
    ...data,
    date: new Date(data.date),
  };
};

const func_showCreateForm = () => {
  data_isOpenSlider.value = !data_isOpenSlider.value;
  data_isEdit.value = false;
};

const func_showDeleteModal = (data: any) => {
  data_selectedLoan.value = data;
  data_showDeleteModal.value = true;
};

const func_confirmDelete = async () => {
  await loanStore
    .deleteLoan(data_selectedLoan.value?.id)
    .then((res) => {
      loanStore.fetchLoans(data_currentPage.value);
      data_selectedLoan.value = null;
      $emitter.emit("alert-notification", {
        message: res?.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
    })
    .catch((err: any) => {
      $emitter.emit("alert-notification", {
        message: err?.response.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    })
    .finally(() => (data_showDeleteModal.value = false));
};

const func_clearSearch = () => {
  data_searchQuery.value = "";
  loanStore.setSearchQuery(data_searchQuery.value);
  loanStore.fetchLoans(1);
};
</script>
