<template>
  <UContainer>
    <UBreadcrumb
      class="mb-8"
      :links="[{ label: 'Home', to: '/' }, { label: 'Users' }]"
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
            label="Add User"
            trailing
            @click="func_showCreateForm"
          />
        </div>
      </template>

      <UTable
        :rows="getUsers"
        :columns="data_columns"
        class="w-full"
        :loading="userLoading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
      >
        <template #role-data="{ row }">
          <span class="uppercase">{{ row.role }}</span>
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
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  color="white"
                  variant="ghost"
                  label="View"
                  icon="i-heroicons-outline:eye"
                  :to="`/users/${row.profile_id}`"
                />
                <!-- <UButton
                  block
                  :ui="{
                    block: 'w-full flex justify-start items-start',
                  }"
                  class="text-blue-400 hover:text-blue-500"
                  color="white"
                  variant="ghost"
                  label="Edit"
                  icon="i-heroicons-outline:pencil"
                  :to="`/users/${row.profile_id}?isEdit=${true}`"
                /> -->
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
                  @click="func_showConfirmModal(row)"
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

    <UsersForm
      :show="data_isOpenSlider"
      :data="data_form"
      @close="
      (value: boolean) => {
        data_isOpenSlider = value;
      }
    "
    />

    <UModal v-model="data_showConfirmModal" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex">
              <UIcon
                class="w-6 h-6 mr-1 text-orange-500"
                name="heroicons-outline:exclamation"
              />
              <h3
                class="text-base font-semibold text-orange-500 dark:text-orange-500"
              >
                Warning
              </h3>
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="data_showConfirmModal = false"
            />
          </div>
        </template>
        <p>
          Are you sure you want to delete this user? This action is irreversible
          and cannot be undone.
        </p>
        <template #footer>
          <div class="text-right">
            <UButton
              variant="ghost"
              color="white"
              label="Cancel"
              @click="data_showConfirmModal = false"
            />
            <UButton
              variant="solid"
              color="orange"
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
import type { Form } from "~/types/user";

definePageMeta({
  middleware: ["$auth"],
});

const { debounce } = useDebounce();
const { $emitter } = useNuxtApp();

const authStore = useAuthStore();
const { getUsers, userLoading, getPagination, getSearchQuery } =
  storeToRefs(authStore);

// PARAMS
const data_currentPage = ref(1);
const data_searchQuery = ref(getSearchQuery.value);
const data_pagination = computed(() => getPagination.value);

// Table Data
const data_columns = [
  {
    key: "profile_id",
    label: "Profile ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "action",
    label: "Action",
  },
];
const data_showConfirmModal = ref(false);
const data_isOpenSlider = ref(false);
const data_selectedUser = ref<any>(null);
const data_form = ref<Form>({
  name: "",
  email: "",
  contact_no: "",
  role: "",
});

onMounted(() => {
  authStore.fetchUsers(data_currentPage.value);
});

// Methods
const func_showCreateForm = () => {
  data_isOpenSlider.value = !data_isOpenSlider.value;
};

const func_pageChange = (page: number) => {
  data_currentPage.value = page;
  authStore.fetchUsers(page);
};

const func_search = debounce(() => {
  authStore.setSearchQuery(data_searchQuery.value);
  authStore.fetchUsers(1);
}, 1000);

const func_clearSearch = () => {
  data_searchQuery.value = "";
  authStore.setSearchQuery(data_searchQuery.value);
  authStore.fetchUsers(1);
};

const func_showConfirmModal = (data: any) => {
  data_selectedUser.value = data;
  data_showConfirmModal.value = true;
};

const func_confirmDelete = () => {
  authStore
    .deleteUser(data_selectedUser.value?.id)
    .then((res) => {
      authStore.fetchUsers(data_currentPage.value);
      data_selectedUser.value = null;
      $emitter.emit("alert-notification", {
        message: res?.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
    })
    .catch((err: any) => {
      $emitter.emit("alert-notification", {
        message: err?.response?.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    })
    .finally(() => (data_showConfirmModal.value = false));
};
</script>
