<template>
  <USlideover v-model="data_show" prevent-close>
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ isEdit ? `Edit Loan ` : "Create Loan" }}
            <span class="block text-sm text-green-400">{{
              data_form.transaction_no ?? ""
            }}</span>
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="func_closeForm"
          />
        </div>
      </template>
      <UtilsFormValidation
        ref="formValidation"
        :rules="data_rules"
        :model="data_form"
      >
        <UFormGroup label="Amount" name="amount">
          <UInput v-model="data_form.amount" placeholder="1000">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">PHP</span>
            </template>
          </UInput>
        </UFormGroup>

        <UFormGroup label="Loan Percentage" name="loan_percentage">
          <UInput v-model="data_form.loan_percentage" placeholder="0.10">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>

        <UFormGroup label="Date" name="date">
          <AppDatePicker v-model="data_form.date" />
        </UFormGroup>

        <UFormGroup label="Status" name="status" v-if="isEdit">
          <USelect v-model="data_form.status" :options="data_statusOptions" />
        </UFormGroup>

        <UDivider label="Agent" class="pt-4" />

        <UFormGroup label="Agent" name="agent">
          <USelect
            v-model="data_form.agent_id"
            :options="data_agentOptions"
            option-attribute="name"
            placeholder="Select Agent..."
          />
        </UFormGroup>

        <UFormGroup label="Percentage" name="percentage">
          <UInput v-model="data_form.agent_percentage" placeholder="0.10">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>

        <UDivider label="Lead Generator" class="pt-4" />

        <UFormGroup label="Lead Generator" name="lead_generator">
          <USelect
            v-model="data_form.lead_generator_id"
            :options="data_leadGeneratorOptions"
            option-attribute="name"
            placeholder="Select Lead Generator..."
          />
        </UFormGroup>

        <UFormGroup label="Percentage" name="percentage">
          <UInput
            v-model="data_form.lead_generator_percentage"
            placeholder="0.10"
          >
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>
        <div class="text-right pt-6">
          <UButton v-if="!isEdit" type="submit" @click="func_submitForm">
            Submit
          </UButton>
          <UButton v-else type="submit" @click="func_submitForm">
            Update
          </UButton>
        </div>
      </UtilsFormValidation>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
import type { Form } from "~/types/loan";
import { required, numeric, minValue } from "@vuelidate/validators";
const { $emitter } = useNuxtApp();

// Store
const loanStore = useLoanStore();
const authStore = useAuthStore();

const emits = defineEmits(["close"]);
const props = defineProps<{
  show: boolean;
  isEdit: boolean;
  data: Form;
}>();

const data_show = ref(props.show);
const data_form = ref<Form>({
  amount: null,
  date: new Date(),
  loan_percentage: null,
  status: "",
  agent_id: "",
  agent: null,
  agent_percentage: null,
  lead_generator_id: "",
  lead_generator: null,
  lead_generator_percentage: null,
});
const data_rules = computed(() => ({
  amount: { required, numeric, minValue: minValue(5000) },
  date: { required },
  loan_percentage: { required, numeric, minValue: minValue(0.01) },
}));

const data_statusOptions = ["Pending", "Completed"];
const data_agentOptions = ref([]);
const data_leadGeneratorOptions = ref([]);

watch(
  () => props.show,
  (value) => {
    data_show.value = value;
  }
);

watch(
  () => props.data,
  (data) => {
    data_form.value = {
      ...data,
      lead_generator_id: data.lead_generator ? data.lead_generator?.id : null,
      agent_id: data.agent ? data.agent?.id : null,
    };

    console.log(data_form.value);
  }
);

onMounted(async () => {
  await authStore
    .fetchUserByRole("agent")
    .then((res) => (data_agentOptions.value = res.data));
  await authStore
    .fetchUserByRole("lead generator")
    .then((res) => (data_leadGeneratorOptions.value = res.data));
});

// REF
const formValidation = ref();

const func_submitForm = async () => {
  const isValid = await formValidation.value.validate();

  if (!isValid) {
    return;
  }

  const newData = {
    ...data_form.value,
    date: formatDate(data_form.value.date), // Format date to YYYY-MM-DD
    status: props.isEdit ? data_form.value?.status?.toLowerCase() : "pending",
  };

  try {
    const response = props.isEdit
      ? await updateLoan(newData)
      : await createLoan(newData);

    handleSuccess(response?.message || "Operation successful");
  } catch (error: any) {
    handleError(error?.response?.message || "An error occurred");
  }
};

const updateLoan = async (data: any) => {
  return await loanStore.updateLoan(data_form.value.id as number, data);
};

const createLoan = async (data: any) => {
  return await loanStore.createLoan(data);
};

const handleSuccess = (message: string) => {
  func_closeForm();
  loanStore.fetchLoans(1);
  $emitter.emit("alert-notification", {
    message,
    alertType: "success",
    timeout: 3000,
    show: true,
  });
};

const handleError = (message: string) => {
  $emitter.emit("alert-notification", {
    message,
    alertType: "error",
    timeout: 3000,
    show: true,
  });
};

const func_closeForm = () => {
  data_form.value = {
    amount: null,
    loan_percentage: null,
    date: new Date(),
    agent_id: null,
    agent: null,
    agent_percentage: null,
    lead_generator_id: null,
    lead_generator: null,
    lead_generator_percentage: null,
  };
  emits("close", false);
};
</script>
